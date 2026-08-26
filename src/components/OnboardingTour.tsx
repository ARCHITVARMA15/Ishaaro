import { useCallback } from 'react'
import { EVENTS, Joyride, type EventData, type Step, type TooltipRenderProps } from 'react-joyride'

const STEPS: Step[] = [
  {
    target: '[data-tour="wordmark"]',
    title: 'Welcome to Ishaaro',
    content: 'Sign language learning built for Gujarati students.',
    placement: 'bottom-start',
  },
  {
    target: '[data-tour="nav-practice"]',
    title: 'Practice',
    content: 'Practice signs live with real-time AI feedback.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="nav-lessons"]',
    title: 'Lessons',
    content: 'Learn the Gujarati alphabet and numbers at your own pace.',
    placement: 'bottom',
  },
  {
    target: '[data-tour="nav-teacher"]',
    title: 'For Teachers',
    content: "Teachers can track every student's progress here.",
    placement: 'bottom',
  },
  {
    target: '[data-tour="nav-parent"]',
    title: 'For Parents',
    content: "Parents get simple, jargon-free updates on their child's learning.",
    placement: 'bottom',
  },
  {
    target: '[data-tour="cta-start-learning"]',
    title: 'Ready?',
    content: "Let's get started.",
    placement: 'bottom-end',
  },
]

function ProgressDots({ index, size }: { index: number; size: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: size }, (_, i) => (
        <span
          key={i}
          className={[
            'h-1.5 w-1.5 rounded-full transition-colors',
            i === index ? 'bg-accent-500' : 'bg-white/25',
          ].join(' ')}
        />
      ))}
    </div>
  )
}

function TourTooltip({
  step,
  index,
  size,
  isLastStep,
  closeProps,
  primaryProps,
  skipProps,
  tooltipProps,
}: TooltipRenderProps) {
  return (
    <div
      {...tooltipProps}
      className="w-[320px] max-w-[90vw] rounded-2xl border border-primary-900 bg-primary-700 p-5 text-white shadow-[6px_6px_0px_#ff8c5a] sm:w-[360px]"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-heading text-lg font-semibold text-white">{step.title}</h3>
        <button
          {...closeProps}
          aria-label="Close tour"
          className="-mr-1 -mt-1 shrink-0 rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <p className="mt-2 font-body text-sm leading-relaxed text-white/80">{step.content}</p>

      <div className="mt-5 flex items-center justify-between gap-4">
        <ProgressDots index={index} size={size} />
        <div className="flex items-center gap-4">
          <button
            {...skipProps}
            className="font-mono text-xs text-white/50 transition-colors hover:text-white/80"
          >
            Skip
          </button>
          <button
            {...primaryProps}
            className="whitespace-nowrap bg-accent-500 px-4 py-2 font-body text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-600"
          >
            {isLastStep ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

interface OnboardingTourProps {
  run: boolean
  onEnd: () => void
}

export default function OnboardingTour({ run, onEnd }: OnboardingTourProps) {
  const handleEvent = useCallback(
    (data: EventData) => {
      if (data.type === EVENTS.TOUR_END) onEnd()
    },
    [onEnd],
  )

  return (
    <Joyride
      steps={STEPS}
      run={run}
      continuous
      onEvent={handleEvent}
      tooltipComponent={TourTooltip}
      options={{
        overlayColor: 'rgba(16, 43, 38, 0.8)',
        spotlightRadius: 12,
        spotlightPadding: 8,
        closeButtonAction: 'skip',
        skipBeacon: true,
        arrowColor: '#1b4b43',
        zIndex: 10000,
      }}
      styles={{
        spotlight: { stroke: '#ff8c5a', strokeWidth: 3 },
      }}
    />
  )
}
