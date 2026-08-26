import { useEffect, useRef, useState } from 'react'

export type SignStatus = 'idle' | 'checking' | 'mismatch' | 'match'

const MISMATCH_DELAY_MS = 1500

/**
 * Morphs through idle -> checking -> (mismatch | match) as the live detected
 * finger count is compared against the current target. A hand holding the
 * wrong count for ~1.5s settles into "mismatch"; the correct count matches
 * immediately; losing the hand resets to "idle".
 */
export function useSignStatus(fingerCount: number | null, target: number) {
  const [status, setStatus] = useState<SignStatus>('idle')
  const timeoutRef = useRef<number | null>(null)

  const clearPendingTimeout = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  useEffect(() => {
    clearPendingTimeout()
    setStatus('idle')
    return clearPendingTimeout
  }, [target])

  useEffect(() => {
    if (fingerCount === null) {
      clearPendingTimeout()
      setStatus('idle')
      return
    }

    if (fingerCount === target) {
      clearPendingTimeout()
      setStatus('match')
      return
    }

    setStatus((prev) => (prev === 'idle' || prev === 'match' ? 'checking' : prev))

    if (timeoutRef.current === null) {
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
        setStatus('mismatch')
      }, MISMATCH_DELAY_MS)
    }
  }, [fingerCount, target])

  useEffect(() => clearPendingTimeout, [])

  return status
}
