import { HandLandmarker } from '@mediapipe/tasks-vision'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createHandLandmarker } from '../lib/mediapipe/handLandmarker'
import { countExtendedFingers, type HandLandmark } from '../lib/practice/fingerCount'
import { drawHandSkeleton } from '../lib/practice/drawHandSkeleton'

export type CameraStatus =
  | 'idle'
  | 'requesting'
  | 'granted'
  | 'denied'
  | 'unsupported'

export type ModelStatus = 'loading' | 'ready' | 'error'

// How many recent frames to smooth the finger count over. A single noisy
// frame (motion blur, a finger mid-curl) shouldn't be enough to flip the
// reported count — we take the mode of a short rolling window instead.
const SMOOTHING_WINDOW = 5

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

    const recentCounts: number[] = []
    function smoothCount(raw: number | null): number | null {
      if (raw === null) {
        recentCounts.length = 0
        return null
      }
      recentCounts.push(raw)
      if (recentCounts.length > SMOOTHING_WINDOW) recentCounts.shift()

      const tally = new Map<number, number>()
      for (const value of recentCounts) tally.set(value, (tally.get(value) ?? 0) + 1)
      let mode = raw
      let modeVotes = 0
      for (const [value, votes] of tally) {
        if (votes > modeVotes) {
          mode = value
          modeVotes = votes
        }
      }
      return mode
    }

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
            setFingerCount(smoothCount(countExtendedFingers(hand)))
            setConfidence(result.handedness[0]?.[0]?.score ?? null)
          } else {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height)
            smoothCount(null)
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
