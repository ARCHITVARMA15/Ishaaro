interface CaptionPanelProps {
  speakerLabel: string
  listening: boolean
  primaryText: string
  secondaryText?: string
  /** 'gu' renders the transcript in Noto Sans Gujarati, matching Practice/Lessons. */
  scriptLang?: 'en' | 'gu'
}

export default function CaptionPanel({
  speakerLabel,
  listening,
  primaryText,
  secondaryText,
  scriptLang = 'en',
}: CaptionPanelProps) {
  return (
    <div
      lang={scriptLang === 'gu' ? 'gu' : undefined}
      className="w-full rounded-2xl border border-primary-900 bg-white p-6 shadow-[4px_4px_0px_#1b4b43] sm:p-8"
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary-900/70">
          {speakerLabel}
        </span>
        {listening && (
          <span className="flex items-center gap-1.5 rounded-full bg-red-50 px-2 py-0.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-red-600">
              Live
            </span>
          </span>
        )}
      </div>

      <p className="mt-4 min-h-[2.5em] font-heading text-2xl font-bold leading-snug text-primary-900 sm:text-3xl">
        {primaryText || <span className="text-primary-900/30">Say something…</span>}
      </p>

      <p className="mt-2 min-h-[1.25em] font-body text-sm text-primary-900/45">
        {secondaryText}
      </p>
    </div>
  )
}
