import { FilesetResolver, HandLandmarker } from '@mediapipe/tasks-vision'
import { useCallback, useEffect, useRef, useState } from 'react'
import { countExtendedFingers, type HandLandmark } from '../lib/practice/fingerCount'
import { drawHandSkeleton } from '../lib/practice/drawHandSkeleton'

const WASM_BASE = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm'
const MODEL_URL =
  'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'

export type CameraStatus =
  | 'idle'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'unsupported'

export type ModelStatus = 'loading' | 'ready' | 'error'

async function createHandLandmarker() {
  const vision = await FilesetResolver.forVisionTasks(WASM_BASE)
  const options = {
    baseOptions: { modelAssetPath: MODEL_URL },
    runningMode: 'VIDEO' as const,
    numHands: 1,
  }
  try {
    return await HandLandmarker.createFromOptions(vision, {
      ...options,
      baseOptions: { ...options.baseOptions, delegate: 'GPU' as const },
    })
  } catch (err) {
    console.warn('GPU delegate unavailable for HandLandmarker, falling back to CPU', err)
    return HandLandmarker.createFromOptions(vision, {
      ...options,
      baseOptions: { ...options.baseOptions, delegate: 'CPU' as const },
    })
  }
}

export function useHandTracking() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const landmarkerRef = useRef<HandLandmarker | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)

  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('idle')
  const [modelStatus, setModelStatus] = useState<ModelStatus>('loading')
  const [fingerCount, setFingerCount] = useState<number | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    createHandLandmarker()
      .then((landmarker) => {
        if (cancelled) {
          landmarker.close()
          return
        }
        landmarkerRef.current = landmarker
        setModelStatus('ready')
      })
      .catch((err) => {
        console.error('Failed to load hand landmark model', err)
        if (!cancelled) setModelStatus('error')
      })

    return () => {
      cancelled = true
      landmarkerRef.current?.close()
      landmarkerRef.current = null
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }, [])

  const requestCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraStatus('unsupported')
      return
    }
    setCameraStatus('requesting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      })
      streamRef.current = stream
      setCameraStatus('granted')
    } catch (err) {
      console.error('Camera permission denied or unavailable', err)
      setCameraStatus('denied')
    }
  }, [])

  useEffect(() => {
    requestCamera()
    return () => stopCamera()
  }, [requestCamera, stopCamera])

  // The <video> element only mounts once cameraStatus flips to 'granted', so
  // wiring up the stream has to happen in a separate effect that runs after
  // that render commits — assigning srcObject inside requestCamera itself
  // would race the mount and silently drop the stream.
  useEffect(() => {
    if (cameraStatus !== 'granted') return
    const video = videoRef.current
    const stream = streamRef.current
    if (video && stream) {
      video.srcObject = stream
      video.play().catch((err) => console.error('Failed to start video playback', err))
    }
  }, [cameraStatus])

  useEffect(() => {
    if (cameraStatus !== 'granted' || modelStatus !== 'ready') return

    const video = videoRef.current
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!video || !canvas || !container) return

    function syncCanvasSize() {
      const rect = container!.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas!.width = Math.max(1, Math.round(rect.width * dpr))
      canvas!.height = Math.max(1, Math.round(rect.height * dpr))
    }

    const resizeObserver = new ResizeObserver(syncCanvasSize)
    resizeObserver.observe(container)
    syncCanvasSize()

    const ctx = canvas.getContext('2d')

    function tick() {
      const landmarker = landmarkerRef.current
      if (landmarker && video!.readyState >= 2 && video!.videoWidth) {
        const result = landmarker.detectForVideo(video!, performance.now())
        const hand = result.landmarks[0] as HandLandmark[] | undefined

        if (ctx) {
          if (hand) {
            drawHandSkeleton(ctx, hand, HandLandmarker.HAND_CONNECTIONS, {
              videoWidth: video!.videoWidth,
              videoHeight: video!.videoHeight,
              canvasWidth: canvas!.width,
              canvasHeight: canvas!.height,
            })
            setFingerCount(countExtendedFingers(hand))
            setConfidence(result.handedness[0]?.[0]?.score ?? null)
          } else {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height)
            setFingerCount(null)
            setConfidence(null)
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
    }
  }, [cameraStatus, modelStatus])

  return {
    videoRef,
    canvasRef,
    containerRef,
    cameraStatus,
    modelStatus,
    fingerCount,
    confidence,
    requestCamera,
  }
}
