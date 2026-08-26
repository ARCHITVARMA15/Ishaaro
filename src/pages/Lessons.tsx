const units = [
  { title: 'Unit 1 · Foundations', desc: 'Letters, sounds, and greetings.' },
  { title: 'Unit 2 · Everyday Words', desc: 'Family, food, and numbers.' },
  { title: 'Unit 3 · Simple Sentences', desc: 'Putting words together.' },
  { title: 'Unit 4 · Reading Practice', desc: 'Short stories and questions.' },
]

export default function Lessons() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
        Curriculum
      </span>
      <h1 className="mt-3 font-heading text-3xl font-bold text-primary-950 sm:text-4xl">
        Lessons
      </h1>
      <p className="mt-2 max-w-xl text-primary-700">
        A structured path from first words to confident reading.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {units.map((unit) => (
          <div
            key={unit.title}
            className="flex flex-col justify-between gap-3 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="font-heading text-lg font-semibold text-primary-700">
                {unit.title}
              </h2>
              <p className="mt-1 text-sm text-primary-950/70">{unit.desc}</p>
            </div>
            <button
              type="button"
              className="self-start rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600 sm:self-auto"
            >
              View Unit
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
