import { HandLandmarker } from '@mediapipe/tasks-vision'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { createHandLandmarker } from '../lib/mediapipe/handLandmarker'
import { drawHandSkeleton } from '../lib/practice/drawHandSkeleton'
import type { HandLandmark } from '../lib/practice/fingerCount'

export type LandmarkModelStatus = 'loading' | 'ready' | 'error'

/**
 * Draws live MediaPipe hand landmarks over a video feed — no finger
 * counting, coaching, or matching logic, just the skeleton overlay.
 */
export function useHandLandmarkOverlay(
  videoRef: RefObject<HTMLVideoElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  const [modelStatus, setModelStatus] = useState<LandmarkModelStatus>('loading')
  const landmarkerRef = useRef<HandLandmarker | null>(null)
  const rafRef = useRef<number | null>(null)

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

  useEffect(() => {
    if (!enabled || modelStatus !== 'ready') return

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
          } else {
            ctx.clearRect(0, 0, canvas!.width, canvas!.height)
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
  }, [enabled, modelStatus, videoRef, canvasRef, containerRef])

  return { modelStatus }
}
