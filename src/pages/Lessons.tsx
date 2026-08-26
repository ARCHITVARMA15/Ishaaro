import { useState } from 'react'
import StitchFooter from '../components/StitchFooter'
import StitchHeader from '../components/StitchHeader'
import { LESSON_TABS, type LessonCard } from '../lib/lessons/data'

const ROTATIONS = [-2, 3, -1.5, 2.5, -3, 1.5, -2.5, 2, -1, 3.5]
const OFFSETS = [0, -14, 10, -6, 6, -12, 8, -4, 4, -10]

function CheckIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Flashcard({ card, position }: { card: LessonCard; position: number }) {
  const rotation = ROTATIONS[position % ROTATIONS.length]
  const offset = OFFSETS[position % OFFSETS.length]
  const style = { transform: `rotate(${rotation}deg) translateY(${offset}px)` }

  if (card.type === 'note') {
    return (
      <div
        className="relative flex h-80 w-56 shrink-0 flex-col justify-between border border-primary-900 bg-primary-700 p-6 text-white shadow-[4px_4px_0px_#1b4b43]"
        style={style}
      >
        <span className="font-mono text-xs uppercase tracking-widest text-primary-200">
          Note.
        </span>
        <p className="font-heading text-lg leading-snug">{card.text}</p>
        <svg className="h-3 w-full text-accent-500" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
          <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth={2} />
        </svg>
      </div>
    )
  }

  return (
    <div
      className="group relative flex h-80 w-56 shrink-0 flex-col justify-between border border-primary-900 bg-white p-6 transition-transform duration-300 hover:z-20 hover:-translate-y-1 hover:scale-[1.03]"
      style={style}
    >
      {card.completed && (
        <span className="pointer-events-none absolute -inset-2.5 animate-scribble-pulse border-2 border-accent-500 opacity-80" />
      )}

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-xs text-primary-900/70">{card.index}</span>
        {card.completed && <CheckIcon className="h-5 w-5 text-accent-700" />}
      </div>

      <div className="relative flex flex-1 items-center justify-center px-2 text-center">
        {card.glyph ? (
          <span className="font-gujarati text-[96px] leading-none text-primary-700">
            {card.glyph}
          </span>
        ) : (
          <span className="font-heading text-xl font-semibold leading-snug text-primary-700">
            {card.label}
          </span>
        )}
      </div>

      <div className="relative text-center">
        {card.glyph ? (
          <span className="font-heading text-base text-primary-900">{card.label}</span>
        ) : (
          <span className="font-mono text-xs leading-snug text-primary-900/70">
            {card.sublabel}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Lessons() {
  const [activeTab, setActiveTab] = useState(0)
  const tab = LESSON_TABS[activeTab]

  return (
    <div className="min-h-screen bg-primary-50 font-body text-primary-900 antialiased">
      <StitchHeader />

      <main className="mx-auto max-w-7xl px-5 py-12 md:px-16">
        <section className="mb-16 w-full md:w-[60%]">
          <svg className="mb-3 h-6 w-10 text-accent-500" viewBox="0 0 100 40" fill="none">
            <path
              d="M5 30 C 20 5, 35 5, 50 20"
              stroke="currentColor"
              strokeWidth={4}
              strokeLinecap="round"
            />
          </svg>
          <h1 className="mb-4 font-heading text-4xl font-medium leading-tight text-primary-900 sm:text-5xl">
            Mastering
            <br />
            the Hand
          </h1>
          <p className="max-w-2xl text-primary-900/70">
            <span className="font-mono text-xs uppercase tracking-widest text-primary-700">
              {tab.moduleTitle}.{' '}
            </span>
            {tab.intro}
          </p>
        </section>

        <div className="mb-12 flex flex-wrap gap-2 border-b-2 border-primary-900">
          {LESSON_TABS.map((t, i) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveTab(i)}
              style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)' }}
              className={[
                '-mb-px px-8 py-3 font-mono text-sm font-bold uppercase tracking-wide transition-colors',
                i === activeTab
                  ? 'bg-primary-700 text-white'
                  : 'border border-b-0 border-primary-100 bg-white text-primary-900/70 hover:bg-primary-100/60',
              ].join(' ')}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-14 pb-8 md:justify-start">
          {tab.cards.map((card, i) => (
            <Flashcard key={`${tab.key}-${i}`} card={card} position={i} />
          ))}
        </div>
      </main>

      <StitchFooter />
    </div>
  )
}
