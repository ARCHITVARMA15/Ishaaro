const stats = [
  { label: 'Active Students', value: '28' },
  { label: 'Lessons Assigned', value: '12' },
  { label: 'Avg. Completion', value: '76%' },
]

export default function Teacher() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <span className="inline-block rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
        Teacher Dashboard
      </span>
      <h1 className="mt-3 font-heading text-3xl font-bold text-primary-950 sm:text-4xl">
        Your Classroom
      </h1>
      <p className="mt-2 max-w-xl text-primary-700">
        A quick view of how your students are progressing.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-primary-100 bg-white p-6 text-center shadow-sm"
          >
            <p className="font-heading text-3xl font-bold text-primary-700">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-primary-950/70">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-primary-700">
          Recent Activity
        </h2>
        <p className="mt-2 text-sm text-primary-950/70">
          Student progress and assignment activity will appear here.
        </p>
      </div>
    </div>
  )
}
