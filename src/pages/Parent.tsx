export default function Parent() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
        Parent View
      </span>
      <h1 className="mt-3 font-heading text-3xl font-bold text-primary-950 sm:text-4xl">
        How's your child doing?
      </h1>
      <p className="mt-2 max-w-xl text-primary-700">
        A simple, jargon-free look at progress and what's coming up next.
      </p>

      <div className="mt-8 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-heading text-xl font-semibold text-primary-700">
              This Week
            </h2>
            <p className="mt-1 text-sm text-primary-950/70">
              3 lessons completed · 2 to go
            </p>
          </div>
          <div className="h-3 w-full max-w-xs overflow-hidden rounded-full bg-primary-50 sm:w-48">
            <div className="h-full w-3/5 rounded-full bg-accent-500" />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-lg font-semibold text-primary-700">
          Messages from Teacher
        </h2>
        <p className="mt-2 text-sm text-primary-950/70">
          Notes and updates from the classroom will show up here.
        </p>
      </div>
    </div>
  )
}
