import { useEffect, useState } from 'react'
import HandPoseLoader from '../components/HandPoseLoader'
import StitchHeader from '../components/StitchHeader'
import {
  ArchiveIcon,
  CameraOffIcon,
  CoachIcon,
  HandIcon,
  SchoolIcon,
} from '../components/icons'
import { useHandTracking } from '../hooks/useHandTracking'
import { useSignStatus, type SignStatus } from '../hooks/useSignStatus'
import { useLanguage } from '../i18n/LanguageContext'
import type { Strings } from '../i18n/strings'
import { NUMERAL_TARGETS } from '../lib/practice/fingerCount'

function getCoachMessage(status: SignStatus, targetValue: number, strings: Strings): string {
  const { coach, correctiveTips } = strings.practice
  switch (status) {
    case 'checking':
      return coach.checking
    case 'match':
      return coach.match
    case 'mismatch':
      return correctiveTips[targetValue] ?? coach.mismatchFallback
    case 'idle':
    default:
      return coach.idle
  }
}

function StatusPill({ status, strings }: { status: SignStatus; strings: Strings }) {
  const [matchKey, setMatchKey] = useState(0)

  useEffect(() => {
    if (status === 'match') setMatchKey((key) => key + 1)
  }, [status])

  const isMatch = status === 'match'
  const isMismatch = status === 'mismatch'
  const isChecking = status === 'checking'

  return (
    <div
      className={[
        'pointer-events-auto flex items-center gap-3 rounded-full border-2 px-6 py-3 font-mono text-sm transition-all duration-500 ease-out',
        isMatch
          ? 'border-accent-500 bg-accent-500 text-white shadow-[4px_4px_0px_#1b4b43]'
          : isMismatch
            ? 'border-accent-600 bg-background/95 text-accent-800'
            : 'border-primary-700 bg-background/90 text-primary-700',
      ].join(' ')}
    >
      {isChecking && (
        <span className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-primary-700 border-t-transparent" />
      )}
      {isMatch && (
        <svg key={matchKey} viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
          <path
            d="M5 13l4 4L19 7"
            stroke="white"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="animate-checkmark-draw"
          />
        </svg>
      )}
      <span key={status} className="animate-pill-pop whitespace-nowrap">
        {strings.practice.status[status]}
      </span>
    </div>
  )
}

export default function PracticeScreen() {
  const { lang, strings } = useLanguage()
  const { practice } = strings
  const [targetIndex, setTargetIndex] = useState(4)
  const {
    videoRef,
    canvasRef,
    containerRef,
    cameraStatus,
    modelStatus,
    fingerCount,
    confidence,
    requestCamera,
  } = useHandTracking()

  const target = NUMERAL_TARGETS[targetIndex]
  const status = useSignStatus(fingerCount, target.value)
  const coachMessage = getCoachMessage(status, target.value, strings)

  const goPrev = () =>
    setTargetIndex((i) => (i - 1 + NUMERAL_TARGETS.length) % NUMERAL_TARGETS.length)
  const goNext = () => setTargetIndex((i) => (i + 1) % NUMERAL_TARGETS.length)

  const showOverlay = cameraStatus !== 'granted'
  const isDenied = cameraStatus === 'denied' || cameraStatus === 'unsupported'

  return (
    <div lang={lang} className="min-h-screen bg-background pb-20 font-body text-primary-900 antialiased md:pb-0">
      <StitchHeader />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 p-5 md:flex-row md:gap-10 md:p-16">
        {/* Left: Practice Context */}
        <aside className="flex w-full flex-col gap-8 md:w-1/3 md:pt-10">
          <div className="relative flex flex-col gap-4">
            <svg className="h-8 w-12 text-accent-500" viewBox="0 0 100 40" fill="none">
              <path
                d="M5 30 C 20 5, 35 5, 50 20"
                stroke="currentColor"
                strokeWidth={4}
                strokeLinecap="round"
              />
            </svg>
            <h1 className="font-heading text-4xl font-medium leading-tight text-primary-900 sm:text-5xl">
              {practice.heading1}
              <br />
              {practice.heading2}
            </h1>
            <p className="max-w-sm text-primary-900/70">{practice.subheadline}</p>
          </div>

          {/* Target Sign card */}
          <div className="relative border border-primary-900 bg-white p-6 shadow-[4px_4px_0px_#1b4b43]">
            <span className="mb-2 block font-mono text-xs uppercase tracking-widest text-primary-900">
              {practice.targetSignLabel}
            </span>
            <div className="flex items-center justify-between gap-4">
              <span className="font-gujarati text-6xl leading-none text-primary-700 sm:text-7xl">
                {target.gujarati}
              </span>
              <div className="text-right">
                <span className="block font-mono text-xs text-primary-900/70">
                  {practice.numeralLabel}
                </span>
                <span className="font-heading text-xl font-semibold text-primary-900">
                  {practice.numerals[target.value]}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-primary-100 pt-4">
              <button
                type="button"
                onClick={goPrev}
                className="whitespace-nowrap font-mono text-xs uppercase tracking-wide text-primary-700 transition-colors hover:text-accent-800"
              >
                &larr; {practice.prev}
              </button>
              <span className="whitespace-nowrap font-mono text-xs text-primary-900/70">
                {targetIndex + 1} / {NUMERAL_TARGETS.length}
              </span>
              <button
                type="button"
                onClick={goNext}
                className="whitespace-nowrap font-mono text-xs uppercase tracking-wide text-primary-700 transition-colors hover:text-accent-800"
              >
                {practice.skip} &rarr;
              </button>
            </div>
          </div>

          {/* SignCoach feedback */}
          <div className="mt-auto flex items-start gap-4 border-l-4 border-accent-500 bg-primary-700 p-6 text-white">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-600">
              <CoachIcon className="h-4 w-4 text-accent-400" />
            </div>
            <div>
              <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-primary-200">
                {practice.signCoachLabel}
              </span>
              <p
                key={coachMessage}
                className="animate-pill-pop text-sm leading-relaxed text-primary-50"
              >
                {coachMessage}
              </p>
            </div>
          </div>
        </aside>

        {/* Right: Camera view */}
        <section
          ref={containerRef}
          className={[
            'relative h-[420px] w-full overflow-hidden rounded-[2rem] border-2 bg-primary-900 md:h-auto md:min-h-[520px] md:w-2/3',
            status === 'idle' ? 'animate-camera-frame-pulse' : 'border-primary-700',
          ].join(' ')}
        >
          {cameraStatus === 'granted' && (
            <>
              <video
                ref={videoRef}
                muted
                playsInline
                autoPlay
                className="absolute inset-0 h-full w-full object-cover [transform:scaleX(-1)]"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full [transform:scaleX(-1)]"
              />
            </>
          )}

          {showOverlay && !isDenied && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-primary-900 text-white">
              <HandPoseLoader
                size={72}
                lineColor="#ffffff"
                dotColor="#ff8c5a"
                label={
                  modelStatus === 'loading'
                    ? practice.cameraLoadingAria
                    : practice.cameraRequestingAria
                }
              />
              <p className="font-mono text-xs uppercase tracking-widest text-white/80">
                {modelStatus === 'loading' ? practice.cameraLoading : practice.cameraRequesting}
              </p>
            </div>
          )}

          {isDenied && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-primary-900 px-8 text-center text-white">
              <CameraOffIcon className="h-10 w-10 text-accent-400" />
              <div>
                <p className="font-heading text-lg font-semibold">{practice.cameraDeniedTitle}</p>
                <p className="mt-2 max-w-xs text-sm text-white/70">
                  {cameraStatus === 'unsupported'
                    ? practice.cameraDeniedBodyUnsupported
                    : practice.cameraDeniedBodyDenied}
                </p>
              </div>
              {cameraStatus !== 'unsupported' && (
                <button
                  type="button"
                  onClick={requestCamera}
                  className="bg-accent-500 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-600"
                >
                  {practice.enableCamera}
                </button>
              )}
            </div>
          )}

          {cameraStatus === 'granted' && (
            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 border border-white/30 bg-primary-900/80 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-sm">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  {practice.hud.rec}
                </div>
                <div className="flex flex-col items-end gap-0.5 border border-white/30 bg-primary-900/80 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-sm">
                  <span>
                    {practice.hud.confidence}{' '}
                    {confidence !== null ? `${Math.round(confidence * 100)}%` : '--'}
                  </span>
                  <span
                    className={fingerCount !== null ? 'text-accent-400' : 'text-white/50'}
                  >
                    {fingerCount !== null ? practice.hud.trackingActive : practice.hud.noHandDetected}
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
                <svg width="160" height="160" viewBox="0 0 200 200" fill="none">
                  <path
                    d="M100 0V200M0 100H200"
                    stroke="#FF8C5A"
                    strokeDasharray="4 4"
                    strokeWidth={1}
                  />
                  <circle cx="100" cy="100" r="80" stroke="#1B4B43" strokeWidth={1} />
                </svg>
              </div>

              <div className="flex justify-center">
                <StatusPill status={status} strings={strings} />
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full justify-around border-t border-primary-100 bg-background py-3 md:hidden">
        <a
          href="#"
          className="flex flex-col items-center gap-1 text-primary-900/70 hover:text-primary-700"
        >
          <SchoolIcon className="h-5 w-5" />
          <span className="font-mono text-[10px]">{practice.mobileNav.curriculum}</span>
        </a>
        <span className="-mt-px flex flex-col items-center gap-1 border-t-2 border-accent-500 pt-1 font-semibold text-primary-700">
          <HandIcon className="h-5 w-5" />
          <span className="font-mono text-[10px]">{practice.mobileNav.practice}</span>
        </span>
        <a
          href="#"
          className="flex flex-col items-center gap-1 text-primary-900/70 hover:text-primary-700"
        >
          <ArchiveIcon className="h-5 w-5" />
          <span className="font-mono text-[10px]">{practice.mobileNav.archive}</span>
        </a>
      </nav>
    </div>
  )
}
