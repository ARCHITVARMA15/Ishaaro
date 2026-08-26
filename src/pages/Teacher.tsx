import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { BookIcon, GridIcon, SettingsIcon, UsersIcon } from '../components/icons'
import { useCountUp } from '../hooks/useCountUp'
import { ASSESSMENT_DATA, STAT_CARDS, STUDENTS } from '../lib/teacher/data'

const NAV_ITEMS = [
  { label: 'Overview', icon: GridIcon, active: true },
  { label: 'Students', icon: UsersIcon, active: false },
  { label: 'Curriculum', icon: BookIcon, active: false },
]

function StatCardView({
  label,
  target,
  delta,
  sparklinePath,
}: {
  label: string
  target: number
  delta: string
  sparklinePath: string
}) {
  const value = useCountUp(target)

  return (
    <div className="relative overflow-hidden border border-primary-900 bg-white p-8 shadow-[4px_4px_0px_#1b4b43]">
      <div className="mb-4 font-mono text-xs uppercase tracking-widest text-primary-700">
        {label}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-6xl font-medium text-primary-900">{value}</span>
        <span className="font-heading text-2xl font-medium text-primary-900">%</span>
      </div>
      <div className="mt-3 font-mono text-xs text-accent-800">{delta}</div>
      <svg
        className="mt-4 h-12 w-28 text-accent-500 opacity-70"
        viewBox="0 0 100 50"
        fill="none"
      >
        <path d={sparklinePath} stroke="currentColor" strokeWidth={2} />
      </svg>
    </div>
  )
}

function ScoreCell({ score }: { score: number }) {
  return (
    <span className={score < 75 ? 'text-red-600' : 'text-accent-800'}>{score}%</span>
  )
}

export default function Teacher() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-primary-900 antialiased md:flex-row">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-primary-900 bg-primary-900 px-5 py-4 text-white md:hidden">
        <span className="font-heading text-lg font-bold uppercase tracking-tight">
          Ishaaro
        </span>
        <span className="font-mono text-xs uppercase tracking-widest text-accent-400">
          Overview
        </span>
      </div>

      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col justify-between bg-primary-900 p-8 text-white md:flex">
        <div>
          <div className="mb-12 font-heading text-lg font-bold uppercase tracking-tight text-primary-100">
            Ishaaro
          </div>
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href="#"
                className={[
                  '-ml-4 flex items-center gap-4 border-l-4 pl-4 transition-colors',
                  item.active
                    ? 'border-accent-500 font-bold text-primary-100'
                    : 'border-transparent text-primary-100/60 hover:text-primary-100',
                ].join(' ')}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>
        </div>
        <a
          href="#"
          className="flex items-center gap-4 pl-0 text-primary-100/60 transition-colors hover:text-primary-100"
        >
          <SettingsIcon className="h-5 w-5" />
          <span className="font-mono text-xs uppercase tracking-widest">Settings</span>
        </a>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background p-5 md:p-16">
        <header className="mb-12 flex flex-col items-start justify-between gap-4 md:mb-16 md:flex-row md:items-end">
          <div className="md:w-[60%]">
            <h1 className="font-heading text-3xl font-medium leading-tight text-primary-700 sm:text-4xl">
              Cohort <span className="underline decoration-accent-500 decoration-4 underline-offset-4">Alpha</span> Analytics
            </h1>
            <p className="mt-4 max-w-2xl text-primary-900/70">
              Tracking progress and engagement across advanced sign language mastery
              modules.
            </p>
          </div>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <span className="font-mono text-xs uppercase tracking-widest text-primary-700">
              Current Term
            </span>
            <span className="font-heading text-lg font-semibold text-primary-900">
              Fall 2024
            </span>
          </div>
        </header>

        {/* Stats row */}
        <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-3 md:mb-16 md:grid-cols-1 lg:grid-cols-3">
          {STAT_CARDS.map((stat) => (
            <StatCardView key={stat.label} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Assessment chart */}
          <div className="border border-primary-900 bg-white p-6 sm:p-8 lg:col-span-7">
            <h3 className="mb-6 font-heading text-xl font-semibold text-primary-700">
              Pre vs. After 12 Weeks
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ASSESSMENT_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#1b4b43" />
                    <stop offset="100%" stopColor="#ff8c5a" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#102b2620" />
                <XAxis
                  dataKey="skill"
                  tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#102b26' }}
                  axisLine={{ stroke: '#102b26' }}
                  tickLine={false}
                  interval={0}
                />
                <YAxis
                  tick={{ fontFamily: 'JetBrains Mono', fontSize: 11, fill: '#102b26' }}
                  axisLine={false}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip
                  cursor={{ fill: '#1b4b4310' }}
                  contentStyle={{
                    fontFamily: 'Manrope',
                    border: '1px solid #102b26',
                    borderRadius: 0,
                  }}
                />
                <Legend
                  wrapperStyle={{ fontFamily: 'JetBrains Mono', fontSize: 11 }}
                  formatter={(v) => (v === 'pre' ? 'Pre-Assessment' : 'After 12 Weeks')}
                />
                <Bar dataKey="pre" name="pre" fill="#e0e3e1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="after" name="after" fill="url(#scoreGradient)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Student roster */}
          <div className="border border-primary-900 bg-primary-50 shadow-[4px_4px_0px_#1b4b43] lg:col-span-5">
            <div className="border-b border-primary-900 bg-primary-700 p-6 text-white sm:p-8">
              <h3 className="font-heading text-xl font-semibold">Student Roster</h3>
              <p className="mt-1 text-sm text-primary-100/80">Requires review</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <tbody>
                  {STUDENTS.map((student, i) => (
                    <tr
                      key={student.initials}
                      className={i % 2 === 1 ? 'bg-primary-100/50' : 'bg-transparent'}
                    >
                      <td className="p-4 sm:p-6">
                        <div className="flex items-center gap-4">
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-accent-500 font-heading text-sm text-accent-800"
                            style={{ borderRadius: '50% 40% 60% 40% / 40% 50% 40% 60%' }}
                          >
                            {student.initials}
                          </span>
                          <div>
                            <div className="font-body text-sm font-semibold text-primary-900">
                              {student.name}
                            </div>
                            <div className="font-mono text-xs text-primary-900/70">
                              {student.focus}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right font-mono text-sm sm:p-6">
                        <ScoreCell score={student.score} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-primary-900 bg-white p-6 text-center">
              <button
                type="button"
                className="font-mono text-xs uppercase tracking-widest text-primary-700 transition-colors hover:text-accent-800"
              >
                View Full Roster &rarr;
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
