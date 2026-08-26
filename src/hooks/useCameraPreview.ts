import { useCallback, useEffect, useRef, useState } from 'react'

export type CameraPreviewStatus = 'idle' | 'requesting' | 'granted' | 'denied'

/** A raw getUserMedia preview — no hand tracking, just proving the camera works. */
export function useCameraPreview() {
  const [status, setStatus] = useState<CameraPreviewStatus>('idle')
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
  }, [])

  const enableCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('denied')
      return
    }
    setStatus('requesting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      setStatus('granted')
    } catch {
      setStatus('denied')
    }
  }, [])

  // The <video> element only mounts once status flips to 'granted', so the
  // srcObject assignment has to happen after that render commits — not
  // inline in enableCamera, where videoRef.current is still null.
  useEffect(() => {
    if (status === 'granted' && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [status])

  useEffect(() => stopStream, [stopStream])

  return { status, videoRef, enableCamera }
}
