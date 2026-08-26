import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CaptionPanel from '../components/connect/CaptionPanel'
import SignAvatarPanel from '../components/connect/SignAvatarPanel'
import { CameraOffIcon, MicIcon, SyncIcon, VideoIcon } from '../components/icons'
import { useCameraPreview } from '../hooks/useCameraPreview'
import { useHandLandmarkOverlay } from '../hooks/useHandLandmarkOverlay'
import { useSignPlayback } from '../hooks/useSignPlayback'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { MATCH_THRESHOLD, normalizeForMatch, similarity } from '../lib/connect/fuzzyMatch'
import { SIGN_SENTENCES } from '../lib/connect/signSequences'

// Rolling window of recently-heard words used for fuzzy matching against the
// 3 target sentences. Capped so a long demo session doesn't keep matching
// against words spoken minutes ago.
const MATCH_BUFFER_WORDS = 24

const NAV_LINKS = [
  { to: '/practice', label: 'Practice' },
  { to: '/lessons', label: 'Lessons' },
  { to: '/teacher', label: 'Teacher' },
  { to: '/parent', label: 'Parent' },
  { to: '/connect', label: 'Connect' },
]

interface Particle {
  top: string
  left: string
  color: string
  glow: string
  direction: 'forward' | 'reverse'
  delay: string
  duration: string
}

const PARTICLES: Particle[] = [
  { top: '20%', left: '35%', color: '#5f9f8e', glow: 'rgba(95,159,142,0.7)', direction: 'forward', delay: '0s', duration: '3.2s' },
  { top: '65%', left: '55%', color: '#ff8c5a', glow: 'rgba(255,140,90,0.7)', direction: 'reverse', delay: '0.6s', duration: '3.6s' },
  { top: '40%', left: '45%', color: '#5f9f8e', glow: 'rgba(95,159,142,0.7)', direction: 'forward', delay: '1.2s', duration: '3s' },
  { top: '80%', left: '30%', color: '#ff8c5a', glow: 'rgba(255,140,90,0.7)', direction: 'reverse', delay: '1.8s', duration: '3.4s' },
  { top: '10%', left: '60%', color: '#5f9f8e', glow: 'rgba(95,159,142,0.7)', direction: 'forward', delay: '2.2s', duration: '3.8s' },
  { top: '55%', left: '40%', color: '#ff8c5a', glow: 'rgba(255,140,90,0.7)', direction: 'reverse', delay: '0.3s', duration: '3.1s' },
]

const SIGNER_CAPTION = '"...requesting a doctor\'s appointment for tomorrow morning."'

const CHAT_MESSAGES = [
  { from: 'signer' as const, text: 'Hi, I’d like to book an appointment.' },
  { from: 'you' as const, text: 'Of course — what day works for you?' },
  { from: 'signer' as const, text: 'Tomorrow morning, if possible.' },
]

const STT_LANGUAGES = [
  { value: 'en-US' as const, label: 'English' },
  { value: 'gu-IN' as const, label: 'ગુજરાતી' },
]

export default function Connect() {
  const [captionText, setCaptionText] = useState('')
  const [sttLang, setSttLang] = useState<'en-US' | 'gu-IN'>('en-US')
  const wordBufferRef = useRef<string[]>([])

  const { pose, gloss, playingId, stepIndex, stepCount, play, playById } = useSignPlayback(
    useCallback(
      (sentence) =>
        setCaptionText(
          sttLang === 'gu-IN' && sentence.displayTextGu ? sentence.displayTextGu : sentence.displayText,
        ),
      [sttLang],
    ),
  )

  const handleFinalResult = useCallback(
    (text: string) => {
      const cleaned = text.trim()
      if (cleaned) setCaptionText(cleaned)

      const words = normalizeForMatch(text).split(' ').filter(Boolean)
      wordBufferRef.current = [...wordBufferRef.current, ...words].slice(-MATCH_BUFFER_WORDS)
      const buffer = wordBufferRef.current.join(' ')

      for (const sentence of SIGN_SENTENCES) {
        // Not every sentence has a Gujarati target yet — skip rather than
        // match against an empty string when one's missing.
        const target = sttLang === 'gu-IN' ? sentence.textGu : sentence.text
        if (!target) continue
        if (similarity(target, buffer) >= MATCH_THRESHOLD) {
          play(sentence)
          wordBufferRef.current = []
          break
        }
      }
    },
    [play, sttLang],
  )

  const { supported, listening, interimText, start, stop } = useSpeechRecognition({
    onFinalResult: handleFinalResult,
    lang: sttLang,
  })

  // Clear stale text on a language switch so an English caption never
  // lingers under the Gujarati font (or vice versa) after toggling.
  useEffect(() => {
    setCaptionText('')
    wordBufferRef.current = []
  }, [sttLang])

  const { status: cameraStatus, videoRef: previewVideoRef, enableCamera } = useCameraPreview()
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const previewContainerRef = useRef<HTMLDivElement>(null)
  // Points-only MediaPipe overlay on the live preview — no finger counting,
  // matching, or coaching, just the landmark skeleton drawn on top.
  useHandLandmarkOverlay(
    previewVideoRef,
    previewCanvasRef,
    previewContainerRef,
    cameraStatus === 'granted',
  )

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-primary-900 antialiased">
      <nav className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-primary-100 bg-primary-900 px-5 py-4 text-white md:gap-4 md:px-8 lg:px-16">
        <Link
          to="/connect"
          className="shrink-0 font-heading text-lg font-bold uppercase tracking-tight text-white"
        >
          Ishaaro
        </Link>

        <div className="hidden items-center gap-5 md:flex lg:gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'whitespace-nowrap font-mono text-sm tracking-wide transition-colors',
                  isActive
                    ? 'border-b-2 border-accent-500 pb-1 font-bold text-accent-400'
                    : 'text-primary-100/70 hover:text-white',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/practice"
          className="shrink-0 whitespace-nowrap bg-accent-500 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-accent-600 md:px-5"
        >
          Start Learning
        </Link>
      </nav>

      <div className="flex justify-center border-b border-primary-100 bg-background px-5 py-2.5">
        <span className="inline-flex items-center gap-2 border border-accent-600 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-800">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          Product Vision — real-time translation, coming next
        </span>
      </div>

      <main className="relative flex flex-1 flex-col md:flex-row md:overflow-hidden">
        {/* Left: Deaf/Mute user */}
        <section className="relative flex flex-1 flex-col items-center justify-center gap-6 border-b border-primary-900/10 bg-white/50 p-5 pb-14 md:border-b-0 md:border-r md:p-16">
          <div className="w-full max-w-sm self-start">
            <h2 className="font-heading text-2xl font-semibold text-primary-900">
              Deaf/Mute User
            </h2>
            <div className="mt-2 h-1 w-12 bg-accent-500" />
          </div>

          <div className="w-full max-w-sm border border-white/60 bg-white/40 p-3 shadow-sm backdrop-blur-md">
            <div
              ref={previewContainerRef}
              className="relative aspect-[3/4] w-full overflow-hidden bg-primary-100/60"
            >
              {cameraStatus === 'granted' ? (
                <>
                  <video
                    ref={previewVideoRef}
                    muted
                    playsInline
                    autoPlay
                    className="absolute inset-0 h-full w-full object-cover [transform:scaleX(-1)]"
                  />
                  <canvas
                    ref={previewCanvasRef}
                    className="pointer-events-none absolute inset-0 h-full w-full [transform:scaleX(-1)]"
                  />
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-primary-900/25">
                  {cameraStatus === 'denied' ? (
                    <>
                      <CameraOffIcon className="h-12 w-12 text-primary-900/40" />
                      <p className="font-mono text-xs text-primary-900/50">
                        Camera access was denied
                      </p>
                    </>
                  ) : (
                    <VideoIcon className="h-14 w-14" />
                  )}
                  <button
                    type="button"
                    onClick={enableCamera}
                    disabled={cameraStatus === 'requesting'}
                    className="flex items-center gap-2 border-2 border-primary-900 bg-background px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-900 transition-colors hover:bg-primary-900 hover:text-white disabled:cursor-wait disabled:opacity-60"
                  >
                    <VideoIcon className="h-4 w-4" />
                    {cameraStatus === 'requesting'
                      ? 'Requesting…'
                      : cameraStatus === 'denied'
                        ? 'Try Again'
                        : 'Enable Camera'}
                  </button>
                </div>
              )}

              <div className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-accent-600" />
              <div className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-accent-600" />
              <div className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-accent-600" />
              <div className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-accent-600" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-primary-900/85 px-3 py-2 backdrop-blur-sm">
                <p className="font-body text-xs leading-snug text-white/90 sm:text-sm">
                  {SIGNER_CAPTION}
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="font-mono text-xs text-primary-900/70">01. CAMERA PREVIEW</span>
              <span
                className={[
                  'h-2.5 w-2.5 rounded-full',
                  cameraStatus === 'granted' ? 'animate-pulse bg-accent-500' : 'bg-primary-300',
                ].join(' ')}
              />
            </div>
          </div>
        </section>

        {/* Center divider: bidirectional particle beam. Sits in normal flex
            flow between the two sections on mobile (a horizontal seam of
            natural height), then switches to an absolutely-positioned
            overlay on the seam between the two side-by-side sections on
            desktop — so it always lands exactly between the panels
            regardless of how tall either one renders. */}
        <div className="pointer-events-none relative z-30 h-20 w-full shrink-0 md:absolute md:inset-y-0 md:left-1/2 md:h-full md:w-20 md:-translate-x-1/2">
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-primary-300 to-transparent md:left-1/2 md:top-0 md:h-full md:w-px md:-translate-x-1/2 md:translate-y-0 md:bg-gradient-to-b" />

          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className={[
                'absolute h-2 w-2 rounded-full',
                p.direction === 'forward' ? 'particle-forward' : 'particle-reverse',
              ].join(' ')}
              style={{
                top: p.top,
                left: p.left,
                backgroundColor: p.color,
                boxShadow: `0 0 8px 2px ${p.glow}`,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}

          <div className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-primary-900 bg-background shadow-[4px_4px_0px_#1b4b43]">
            <SyncIcon className="h-5 w-5 text-primary-900" />
          </div>
        </div>

        {/* Right: Hearing user */}
        <section className="relative flex flex-1 flex-col items-center justify-center gap-6 bg-primary-50/60 p-5 pt-14 md:p-16">
          <div className="w-full max-w-sm self-end text-right">
            <h2 className="font-heading text-2xl font-semibold text-primary-900">
              Hearing User
            </h2>
            <div className="ml-auto mt-2 h-1 w-12 bg-primary-700" />
          </div>

          <div className="flex h-96 w-full max-w-sm flex-col border border-primary-900/20 bg-primary-900/5 p-5 shadow-sm backdrop-blur-md sm:p-6">
            <div className="mb-4 border-b border-primary-900/20 pb-2 font-mono text-xs uppercase tracking-widest text-primary-900/70">
              Chat Preview
            </div>
            <div className="flex flex-1 flex-col justify-end gap-3 overflow-y-auto">
              {CHAT_MESSAGES.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.from === 'signer' ? 'flex justify-start' : 'flex justify-end'
                  }
                >
                  <p
                    className={[
                      'max-w-[85%] px-4 py-2 text-sm leading-snug',
                      msg.from === 'signer'
                        ? 'bg-primary-700 text-white'
                        : 'border border-primary-900/30 bg-white text-primary-900',
                    ].join(' ')}
                  >
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-primary-900/20 pt-4">
              <button
                type="button"
                className="flex items-center gap-2 border-2 border-primary-900 px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary-900 transition-colors hover:bg-primary-900 hover:text-white"
              >
                <MicIcon className="h-4 w-4" />
                Tap to Speak
              </button>
              <span className="flex items-center gap-1.5 font-mono text-xs text-primary-900/50">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-300" />
                MIC PREVIEW
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Live speech-to-sign demo — a real, working translation, distinct
          from the aspirational two-panel mockup above. */}
      <section className="border-t border-primary-900/10 bg-background px-5 py-14 md:px-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-primary-900 sm:text-3xl">
                Live Demo
              </h2>
              <p className="mt-1 max-w-md text-sm text-primary-900/60">
                The Hearing User speaks — Ishaaro signs it back live for the
                Deaf/Mute User to follow, no lip-reading or typing needed.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div
                role="group"
                aria-label="Speech recognition language"
                className="flex shrink-0 items-center gap-0.5 rounded-full border border-primary-900 p-0.5 font-mono text-xs font-bold"
              >
                {STT_LANGUAGES.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSttLang(option.value)}
                    aria-pressed={sttLang === option.value}
                    className={[
                      'rounded-full px-2.5 py-1.5 transition-colors',
                      option.value === 'gu-IN' ? 'font-gujarati' : '',
                      sttLang === option.value
                        ? 'bg-primary-700 text-white'
                        : 'text-primary-900/50 hover:text-primary-900',
                    ].join(' ')}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={listening ? stop : start}
                disabled={!supported}
                className={[
                  'flex shrink-0 items-center gap-2 border-2 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors disabled:cursor-not-allowed disabled:opacity-40',
                  listening
                    ? 'border-accent-600 bg-accent-500 text-white hover:bg-accent-600'
                    : 'border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white',
                ].join(' ')}
              >
                <MicIcon className="h-4 w-4" />
                {listening ? 'Stop Mic' : 'Start Mic'}
              </button>

              <span className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs text-primary-900/60">
                <span
                  className={[
                    'h-1.5 w-1.5 rounded-full',
                    listening ? 'animate-pulse bg-accent-500' : 'bg-primary-300',
                  ].join(' ')}
                />
                {supported
                  ? listening
                    ? 'Listening…'
                    : 'Mic off'
                  : 'Speech recognition isn’t supported in this browser'}
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-primary-900/50">
                Hearing User — speaking
              </span>
              <CaptionPanel
                speakerLabel="You"
                listening={listening}
                primaryText={captionText}
                secondaryText={interimText}
                scriptLang={sttLang === 'gu-IN' ? 'gu' : 'en'}
              />
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-widest text-primary-900/50">
                Deaf/Mute User — watching
              </span>
              <SignAvatarPanel
                pose={pose}
                playing={playingId !== null}
                gloss={gloss}
                stepIndex={stepIndex}
                stepCount={stepCount}
                sentences={SIGN_SENTENCES}
                onSelectSentence={playById}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
