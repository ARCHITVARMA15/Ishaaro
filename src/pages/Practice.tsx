export default function Practice() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <span className="inline-block rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-800">
        Student Practice
      </span>
      <h1 className="mt-3 font-heading text-3xl font-bold text-primary-950 sm:text-4xl">
        Practice
      </h1>
      <p className="mt-2 max-w-xl text-primary-700">
        Bite-sized exercises with instant feedback to build confidence, one
        step at a time.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['Warm-up', 'Vocabulary', 'Listening', 'Reading', 'Writing', 'Review'].map(
          (item) => (
            <div
              key={item}
              className="rounded-3xl border border-primary-100 bg-white p-6 shadow-sm"
            >
              <h2 className="font-heading text-lg font-semibold text-primary-700">
                {item}
              </h2>
              <p className="mt-1 text-sm text-primary-950/70">
                Coming soon — a short set of activities to try today.
              </p>
              <button
                type="button"
                className="mt-4 rounded-full bg-primary-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
              >
                Begin
              </button>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
