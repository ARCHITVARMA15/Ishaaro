import { useCallback, useEffect, useRef, useState } from 'react'
import type { HandPoseId } from '../lib/connect/handPoses'
import { SIGN_SENTENCES, type SignSentence } from '../lib/connect/signSequences'

const FRAME_MS = 400
const HOLD_MS = 900

export function useSignPlayback(onPlay?: (sentence: SignSentence) => void) {
  const [pose, setPose] = useState<HandPoseId>('neutral')
  const [gloss, setGloss] = useState<string | null>(null)
  const [playingId, setPlayingId] = useState<1 | 2 | 3 | null>(null)
  const [stepIndex, setStepIndex] = useState<number | null>(null)
  const [stepCount, setStepCount] = useState(0)
  const timersRef = useRef<number[]>([])
  const onPlayRef = useRef(onPlay)
  useEffect(() => {
    onPlayRef.current = onPlay
  }, [onPlay])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => window.clearTimeout(t))
    timersRef.current = []
  }, [])

  const play = useCallback(
    (sentence: SignSentence) => {
      clearTimers()
      setPlayingId(sentence.id)
      setStepCount(sentence.frames.length)
      onPlayRef.current?.(sentence)

      sentence.frames.forEach((frame, i) => {
        timersRef.current.push(
          window.setTimeout(() => {
            setPose(frame.pose)
            setGloss(frame.gloss)
            setStepIndex(i)
          }, i * FRAME_MS),
        )
      })

      const totalMs = sentence.frames.length * FRAME_MS + HOLD_MS
      timersRef.current.push(
        window.setTimeout(() => {
          setPose('neutral')
          setGloss(null)
          setPlayingId(null)
          setStepIndex(null)
        }, totalMs),
      )
    },
    [clearTimers],
  )

  const playById = useCallback(
    (id: 1 | 2 | 3) => {
      const sentence = SIGN_SENTENCES.find((s) => s.id === id)
      if (sentence) play(sentence)
    },
    [play],
  )

  useEffect(() => clearTimers, [clearTimers])

  return { pose, gloss, playingId, stepIndex, stepCount, play, playById }
}
