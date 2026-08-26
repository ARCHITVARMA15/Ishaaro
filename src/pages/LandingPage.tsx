import handMesh from '../assets/landingpage/hand-mesh.jpg'
import handsPhoto from '../assets/landingpage/hands-photo.jpg'
import StitchFooter from '../components/StitchFooter'
import StitchHeader from '../components/StitchHeader'
import { ArrowIcon, SearchIcon } from '../components/icons'
import { useLanguage } from '../i18n/LanguageContext'

export default function LandingPage() {
  const { lang, strings } = useLanguage()
  const { landing } = strings

  return (
    <div lang={lang} className="min-h-screen bg-background font-body text-primary-900 antialiased">
      <StitchHeader showLanguageToast />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-16 md:pb-24 md:pt-24">
          <div className="flex flex-col gap-12 md:flex-row md:gap-8">
            <div className="w-full md:w-[58%]">
              <h1 className="overflow-visible font-heading text-5xl font-medium leading-[1.05] tracking-tight text-primary-900 sm:text-6xl md:text-7xl lg:text-[88px] lg:leading-[0.98]">
                {landing.heroLine1}
                <br />
                <span className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-3 pb-2">
                  <span className="relative inline-block">
                    {landing.barriers}
                    <svg
                      className="pointer-events-none absolute left-0 top-1/2 h-8 w-full -translate-y-1/2"
                      viewBox="0 0 100 20"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M 0 10 Q 25 5 50 12 T 100 8"
                        stroke="#ff8c5a"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                  <span
                    className="inline-block -rotate-3 pr-2 font-script text-[0.5em] italic leading-none text-accent-700"
                    style={{ fontStyle: 'italic' }}
                  >
                    {landing.possibilities}
                  </span>
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-primary-900/70 md:mt-10">
                {landing.subheadline}
              </p>

              <div className="relative mt-10 inline-block md:mt-14">
                <button
                  type="button"
                  className="relative z-10 bg-primary-700 px-8 py-4 font-body text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-800"
                >
                  {strings.nav.startLearning}
                </button>
                <svg
                  className="pointer-events-none absolute -inset-4 z-20 h-[calc(100%+2rem)] w-[calc(100%+2rem)]"
                  viewBox="0 0 200 80"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 20 40 C 20 10, 180 10, 180 40 C 180 70, 20 70, 20 40"
                    stroke="#ff8c5a"
                    strokeWidth="3"
                    strokeDasharray="10 4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Polaroid + stat chip */}
            <div className="relative flex w-full justify-center pt-4 md:w-[42%] md:justify-end md:pt-0">
              <div className="relative w-full max-w-xs rotate-3 border border-primary-900 bg-white p-3 sm:max-w-sm sm:p-4">
                <div className="relative aspect-square w-full overflow-hidden bg-primary-100">
                  <img
                    src={handsPhoto}
                    alt="Two pairs of hands forming an Indian Sign Language gesture, high-contrast black and white photograph"
                    className="h-full w-full object-cover grayscale contrast-125"
                  />
                  <svg
                    className="pointer-events-none absolute left-1/4 top-1/4 h-16 w-16"
                    viewBox="0 0 50 50"
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      stroke="#ff8c5a"
                      strokeWidth="3"
                      strokeDasharray="8 4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </div>

                <div className="absolute -bottom-8 -left-4 z-30 flex flex-col gap-2 border border-accent-600 bg-primary-700 p-4 text-white shadow-[8px_8px_0px_#1b4b43] sm:-bottom-10 sm:-left-10 md:-left-16">
                  <div className="flex items-center gap-2 font-mono text-xs tracking-wide sm:text-sm">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-accent-500" />
                    {landing.statVideos}
                  </div>
                  <div className="border-t border-white/20 pt-2 font-mono text-xs tracking-wide text-white/80 sm:text-sm">
                    {landing.statAccuracy}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Curriculum Methodology */}
        <section className="border-t border-primary-900 bg-primary-50 px-5 py-16 md:px-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 inline-block border-b-2 border-accent-500 pb-3 font-heading text-3xl font-semibold text-primary-900 sm:text-4xl md:mb-12">
              {landing.methodologyTitle}
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              {/* Card 1 */}
              <div className="relative flex flex-col justify-between bg-primary-700 p-8 text-white md:col-span-7">
                <span className="absolute right-4 top-4 font-mono text-xs text-accent-400">
                  01.
                </span>
                <div>
                  <h3 className="mb-4 font-heading text-xl font-semibold">
                    {landing.card1Title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-white/85">
                    {landing.card1Body}
                  </p>
                </div>
                <div className="relative mt-8 h-48 w-full overflow-hidden border border-white/30 bg-white/10">
                  <img
                    src={handMesh}
                    alt="Stylized wireframe graphic of a hand tracking mesh"
                    className="h-full w-full object-cover mix-blend-overlay"
                  />
                  <svg
                    className="pointer-events-none absolute inset-0 h-full w-full p-4"
                    viewBox="0 0 200 100"
                  >
                    <path
                      d="M 50 80 L 150 20"
                      stroke="#ff8c5a"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="150" cy="20" r="5" fill="#ff8c5a" />
                  </svg>
                </div>
              </div>

              {/* Right stacked cards */}
              <div className="flex flex-col gap-8 md:col-span-5">
                <div className="relative flex-grow border border-primary-900 bg-background p-8 shadow-[4px_4px_0px_#1b4b43]">
                  <span className="absolute right-4 top-4 font-mono text-xs text-primary-900">
                    02.
                  </span>
                  <h3 className="mb-2 font-heading text-xl font-semibold text-primary-900">
                    {landing.card2Title}
                  </h3>
                  <p className="text-sm leading-relaxed text-primary-900/70">
                    {landing.card2Body}
                  </p>
                  <a
                    href="#"
                    className="mt-6 inline-flex items-center gap-2 border-b border-accent-600 pb-1 font-mono text-xs text-primary-900 transition-colors hover:text-accent-800"
                  >
                    {landing.card2Link}
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </a>
                </div>

                <div className="relative flex-grow border border-primary-900 bg-background p-8 shadow-[4px_4px_0px_#1b4b43]">
                  <span className="absolute right-4 top-4 font-mono text-xs text-primary-900">
                    03.
                  </span>
                  <h3 className="mb-2 font-heading text-xl font-semibold text-primary-900">
                    {landing.card3Title}
                  </h3>
                  <p className="text-sm leading-relaxed text-primary-900/70">
                    {landing.card3Body}
                  </p>
                  <a
                    href="#"
                    className="mt-6 inline-flex items-center gap-2 border-b border-accent-600 pb-1 font-mono text-xs text-primary-900 transition-colors hover:text-accent-800"
                  >
                    {landing.card3Link}
                    <SearchIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <StitchFooter />
    </div>
  )
}
