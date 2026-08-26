import { SettingsIcon } from '../components/icons'

const WEEK = [
  { day: 'Mon', done: true },
  { day: 'Tue', done: true },
  { day: 'Wed', done: true },
  { day: 'Thu', done: false },
  { day: 'Fri', done: true },
  { day: 'Sat', done: false },
  { day: 'Sun', done: false },
]

const NEW_SIGNS = ['Namaste', 'Water', 'Mother']

const DOT_ROTATIONS = [-6, 3, -12, 0, 6, -3, 8]
const CHIP_ROTATIONS = [2, -3, 1.5]

function AccountIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1-4 4-6 7.5-6s6.5 2 7.5 6" strokeLinecap="round" />
    </svg>
  )
}

function StarIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9L5.7 21l1.7-7L2 9.2l7.1-.6z" />
    </svg>
  )
}

function ProgressRing({ percent }: { percent: number }) {
  const size = 128
  const strokeWidth = 12
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - percent / 100)

  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ffffff"
          strokeOpacity={0.5}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#ff8c5a"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-2xl font-semibold text-primary-900">{percent}%</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-900/50">
          Weekly goal
        </span>
      </div>
    </div>
  )
}

export default function Parent() {
  const completedCount = WEEK.filter((d) => d.done).length

  return (
    <div className="min-h-screen bg-background font-body text-primary-900 antialiased">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b-2 border-primary-900 bg-background px-5 py-4 md:px-16">
        <span className="font-heading text-lg font-bold uppercase tracking-tight text-primary-900">
          Ishaaro
        </span>
        <div className="flex items-center gap-4 text-primary-900">
          <AccountIcon className="h-5 w-5" />
          <SettingsIcon className="h-5 w-5" />
        </div>
      </header>

      <main className="flex justify-center px-5 py-12 md:px-16 md:py-20">
        <article className="relative w-full max-w-3xl overflow-hidden border border-primary-900 bg-[linear-gradient(135deg,rgba(255,140,90,0.16)_0%,rgba(253,251,247,1)_55%)] p-8 shadow-[8px_8px_0px_#1b4b43] md:p-14">
          <svg className="mb-3 h-6 w-10 text-accent-500" viewBox="0 0 100 40" fill="none">
            <path
              d="M5 30 C 20 5, 35 5, 50 20"
              stroke="currentColor"
              strokeWidth={4}
              strokeLinecap="round"
            />
          </svg>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-primary-700">
            Weekly Progress Report &middot; Week 12
          </p>

          <h1 className="mb-10 font-heading text-4xl font-medium leading-tight text-primary-900 sm:text-5xl">
            Arjun practiced <span className="text-accent-600">4 signs</span> this week!
          </h1>

          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-10">
              <section>
                <h2 className="mb-4 font-heading text-lg font-semibold text-primary-900">
                  Weekly Activity
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  {WEEK.map((d, i) => (
                    <div key={d.day} className="flex flex-col items-center gap-1.5">
                      <div
                        className={[
                          'flex h-9 w-9 items-center justify-center border-2 text-white transition-colors',
                          d.done
                            ? 'border-primary-900 bg-accent-500'
                            : 'border-primary-900/30 bg-white/60',
                        ].join(' ')}
                        style={{
                          borderRadius: '50% 40% 55% 45% / 45% 55% 40% 50%',
                          transform: `rotate(${DOT_ROTATIONS[i]}deg)`,
                        }}
                      >
                        {d.done && (
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3}>
                            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span className="font-mono text-[10px] uppercase text-primary-900/50">
                        {d.day}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 max-w-sm text-sm text-primary-900/70">
                  Arjun completed {completedCount} out of 5 planned sessions this week. Great
                  consistency!
                </p>
              </section>

              <section>
                <h2 className="mb-4 font-heading text-lg font-semibold text-primary-900">
                  New Signs Learned
                </h2>
                <div className="flex flex-wrap gap-4">
                  {NEW_SIGNS.map((sign, i) => (
                    <div
                      key={sign}
                      className="flex items-center gap-2 border border-primary-900 bg-white px-4 py-2 font-mono text-xs text-primary-900 shadow-sm"
                      style={{
                        transform: `rotate(${CHIP_ROTATIONS[i % CHIP_ROTATIONS.length]}deg)`,
                        clipPath: 'polygon(0 0, 100% 0, 96% 100%, 4% 100%)',
                      }}
                    >
                      <StarIcon className="h-3.5 w-3.5 text-accent-500" />
                      {sign}
                    </div>
                  ))}
                  <div className="flex items-center border border-dashed border-primary-900/40 px-4 py-2 font-mono text-xs text-primary-900/40">
                    +2 more
                  </div>
                </div>
              </section>
            </div>

            <div className="flex justify-center md:justify-end">
              <ProgressRing percent={80} />
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
