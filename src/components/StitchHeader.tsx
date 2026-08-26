import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { ArrowIcon } from './icons'

const TOAST_DISMISSED_KEY = 'ishaaro:lang-toast-dismissed'
const TOAST_MESSAGE = 'આ વેબસાઇટ ગુજરાતીમાં પણ ઉપલબ્ધ છે!'

function LanguageToggle() {
  const { lang, setLang, strings } = useLanguage()

  return (
    <div
      role="group"
      aria-label={strings.languageToggle.ariaLabel}
      className="flex shrink-0 items-center gap-0.5 rounded-full border border-primary-900 p-0.5 font-mono text-xs font-bold"
    >
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={[
          'rounded-full px-1.5 py-1 transition-colors',
          lang === 'en' ? 'bg-primary-700 text-white' : 'text-primary-900/50',
        ].join(' ')}
      >
        {strings.languageToggle.en}
      </button>
      <button
        type="button"
        onClick={() => setLang('gu')}
        aria-pressed={lang === 'gu'}
        className={[
          'rounded-full px-1.5 py-1 transition-colors',
          lang === 'gu' ? 'bg-primary-700 text-white' : 'text-primary-900/50',
        ].join(' ')}
      >
        {strings.languageToggle.gu}
      </button>
    </div>
  )
}

function LanguageToast() {
  const { lang } = useLanguage()
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(TOAST_DISMISSED_KEY) === 'true')
    } catch {
      setDismissed(false)
    }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      window.localStorage.setItem(TOAST_DISMISSED_KEY, 'true')
    } catch {
      // localStorage unavailable — the toast just won't stay dismissed
      // across a refresh, which is a harmless degradation.
    }
  }

  useEffect(() => {
    if (dismissed || lang !== 'en') return
    const timer = window.setTimeout(dismiss, 5000)
    document.addEventListener('click', dismiss)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('click', dismiss)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed, lang])

  // Only announce the Gujarati option to English-viewing visitors — once
  // they're already in Gujarati, the message no longer applies.
  if (dismissed || lang !== 'en') return null

  return (
    <div
      role="status"
      className="absolute left-1/2 top-full z-50 mt-3 w-52 -translate-x-1/2 border border-accent-600 bg-primary-900 p-3 text-left shadow-[4px_4px_0px_#ff8c5a] sm:w-60"
    >
      <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-accent-600 bg-primary-900" />
      <p className="font-body text-xs leading-snug text-white sm:text-sm">{TOAST_MESSAGE}</p>
    </div>
  )
}

interface StitchHeaderProps {
  showLanguageToast?: boolean
}

export default function StitchHeader({ showLanguageToast = false }: StitchHeaderProps) {
  const { strings } = useLanguage()
  const navLinks = [
    { to: '/practice', label: strings.nav.practice },
    { to: '/lessons', label: strings.nav.lessons },
    { to: '/teacher', label: strings.nav.teacher },
    { to: '/parent', label: strings.nav.parent },
    { to: '/connect', label: strings.nav.connect },
  ]

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    [
      'whitespace-nowrap font-mono text-sm tracking-wide transition-colors',
      isActive
        ? 'border-b-2 border-accent-500 pb-1 font-bold text-primary-900'
        : 'text-primary-900/70 hover:text-accent-800',
    ].join(' ')

  return (
    <header className="relative z-40 border-b border-primary-900 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-5 py-4 md:gap-3 md:px-6 lg:gap-4 lg:px-16">
        <Link
          to="/"
          className="shrink-0 font-heading text-lg font-bold uppercase tracking-tight text-primary-900"
        >
          Ishaaro
        </Link>

        <nav className="hidden items-center gap-3 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClasses}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <div className="relative shrink-0">
            <LanguageToggle />
            {showLanguageToast && <LanguageToast />}
          </div>

          <Link
            to="/practice"
            className="flex shrink-0 items-center gap-2 whitespace-nowrap bg-primary-700 px-4 py-3 font-body text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-800 md:px-5"
          >
            {strings.nav.startLearning}
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
