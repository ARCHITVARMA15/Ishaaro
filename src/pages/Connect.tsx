export default function Connect() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <span className="inline-block rounded-full bg-accent-50 px-3 py-1 text-xs font-semibold text-accent-700">
        Comms Bridge
      </span>
      <h1 className="mt-3 font-heading text-3xl font-bold text-primary-950 sm:text-4xl">
        Stay Connected
      </h1>
      <p className="mt-2 max-w-xl text-primary-700">
        Keep teachers and parents in sync with quick updates, in any
        language.
      </p>

      <div className="mt-8 rounded-3xl border border-primary-100 bg-white p-6 shadow-sm sm:p-8">
        <form className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="message"
              className="text-sm font-semibold text-primary-700"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Write an update to share..."
              className="mt-2 w-full rounded-2xl border border-primary-100 bg-background px-4 py-3 text-sm text-primary-950 focus:border-primary-400 focus:outline-none"
            />
          </div>
          <button
            type="button"
            className="self-start rounded-full bg-primary-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-800"
          >
            Send Update
          </button>
        </form>
      </div>
    </div>
  )
}
