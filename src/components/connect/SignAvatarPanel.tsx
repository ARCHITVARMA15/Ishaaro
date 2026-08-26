import HandPoseIllustration from '../HandPoseIllustration'
import type { HandPoseId } from '../../lib/connect/handPoses'

interface SignAvatarPanelProps {
  pose: HandPoseId
  playing: boolean
  gloss: string | null
  stepIndex: number | null
  stepCount: number
}

export default function SignAvatarPanel({
  pose,
  playing,
  gloss,
  stepIndex,
  stepCount,
}: SignAvatarPanelProps) {
  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-primary-900 bg-primary-50 p-6 shadow-[4px_4px_0px_#1b4b43] sm:p-8">
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

      <div className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-primary-900/15 bg-white sm:h-48 sm:w-48">
        <HandPoseIllustration pose={pose} size={120} />
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
    </div>
  )
}
