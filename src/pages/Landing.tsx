import { Link } from 'react-router-dom'

const audiences = [
  {
    title: 'Students',
    to: '/practice',
    body: 'Practice at your own pace with instant, friendly feedback.',
  },
  {
    title: 'Teachers',
    to: '/teacher',
    body: 'Track class progress and assign lessons in a few taps.',
  },
  {
    title: 'Parents',
    to: '/parent',
    body: "See how your child is doing, anytime, in plain language.",
  },
]

export default function Landing() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="font-gujarati text-4xl text-accent-700 sm:text-5xl"
            lang="gu"
          >
            ઇશારો
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-primary-950 sm:text-5xl">
            Learning made clear, for every learner.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-primary-700 sm:text-lg">
            Ishaaro connects students, teachers, and parents on one simple,
            friendly platform — built for real classrooms.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/practice"
              className="rounded-full bg-primary-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-800 sm:text-base"
            >
              Start Practicing
            </Link>
            <Link
              to="/lessons"
              className="rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-600 sm:text-base"
            >
              Browse Lessons
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {audiences.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className="rounded-3xl border border-primary-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="font-heading text-xl font-semibold text-primary-700">
                {item.title}
              </h2>
              <p className="mt-2 text-sm text-primary-950/70">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
