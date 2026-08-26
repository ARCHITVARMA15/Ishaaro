import { useEffect, useRef, useState } from 'react'
import HandPoseIllustration from '../HandPoseIllustration'
import HandPoseIllustrationSkeletal from '../HandPoseIllustrationSkeletal'
import type { HandPoseId } from '../../lib/connect/handPoses'
import type { SignSentence } from '../../lib/connect/signSequences'

type HandStyle = 'filled' | 'skeletal'

const HAND_STYLES: { value: HandStyle; label: string }[] = [
  { value: 'filled', label: 'Filled' },
  { value: 'skeletal', label: 'Skeletal' },
]

interface SignAvatarPanelProps {
  pose: HandPoseId
  playing: boolean
  gloss: string | null
  stepIndex: number | null
  stepCount: number
  sentences: SignSentence[]
  onSelectSentence: (id: number) => void
}

export default function SignAvatarPanel({
  pose,
  playing,
  gloss,
  stepIndex,
  stepCount,
  sentences,
  onSelectSentence,
}: SignAvatarPanelProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [handStyle, setHandStyle] = useState<HandStyle>('filled')
  const menuRef = useRef<HTMLDivElement>(null)
  const HandIllustration = handStyle === 'filled' ? HandPoseIllustration : HandPoseIllustrationSkeletal

  useEffect(() => {
    if (!menuOpen) return
    function handlePointerDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <div className="relative flex w-full flex-col items-center gap-3 rounded-2xl border border-primary-900 bg-primary-50 p-6 shadow-[4px_4px_0px_#1b4b43] sm:p-8">
      <div className="flex w-full items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-primary-900/70">
          Sign Avatar
        </span>
        <span
          className={[
            'h-2 w-2 shrink-0 rounded-full transition-colors',
            playing ? 'bg-accent-500' : 'bg-primary-300',
          ].join(' ')}
        />
      </div>

      <div
        role="group"
        aria-label="Hand illustration style"
        className="flex shrink-0 items-center gap-0.5 self-start rounded-full border border-primary-900/20 p-0.5 font-mono text-[10px] font-bold"
      >
        {HAND_STYLES.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => setHandStyle(option.value)}
            aria-pressed={handStyle === option.value}
            className={[
              'rounded-full px-2 py-1 transition-colors',
              handStyle === option.value
                ? 'bg-primary-700 text-white'
                : 'text-primary-900/45 hover:text-primary-900',
            ].join(' ')}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-primary-900/15 bg-white sm:h-48 sm:w-48">
        <HandIllustration pose={pose} size={120} />
      </div>

      {/* Word-gloss, in the small-caps convention sign-language linguistics
          uses to transcribe individual signs. Fixed-height so its
          appearance/disappearance never shifts the panel. */}
      <span
        className="min-h-[1.25rem] font-body text-sm font-semibold tracking-wide text-primary-700"
        style={{ fontVariant: 'small-caps' }}
      >
        {gloss}
      </span>

      <div className="flex min-h-[0.375rem] items-center gap-1.5">
        {playing &&
          Array.from({ length: stepCount }, (_, i) => (
            <span
              key={i}
              className={[
                'h-1.5 w-1.5 rounded-full transition-colors',
                i === stepIndex ? 'bg-accent-500' : 'bg-primary-900/15',
              ].join(' ')}
            />
          ))}
      </div>

      {/* Presenter-only fallback: replaces the old 1/2/3 keyboard shortcut
          now that there are 10 sentences. Deliberately low-key — a small
          corner affordance, not a labeled control the audience would notice. */}
      <div ref={menuRef} className="absolute bottom-2 right-2">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Manually trigger a sign sequence"
          aria-expanded={menuOpen}
          className="flex h-6 w-6 items-center justify-center rounded-full text-primary-900/25 transition-colors hover:bg-primary-900/5 hover:text-primary-900/60"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <circle cx="4" cy="10" r="1.6" />
            <circle cx="10" cy="10" r="1.6" />
            <circle cx="16" cy="10" r="1.6" />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute bottom-8 right-0 z-20 w-64 rounded-xl border border-primary-900 bg-white p-1.5 shadow-[4px_4px_0px_#1b4b43]">
            {sentences.map((sentence) => (
              <button
                key={sentence.id}
                type="button"
                onClick={() => {
                  onSelectSentence(sentence.id)
                  setMenuOpen(false)
                }}
                className="block w-full rounded-lg px-3 py-2 text-left font-body text-xs leading-snug text-primary-900/80 transition-colors hover:bg-primary-50 hover:text-primary-900"
              >
                {sentence.displayText}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
