import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/practice', label: 'Practice' },
  { to: '/lessons', label: 'Lessons' },
  { to: '/teacher', label: 'Teacher' },
  { to: '/parent', label: 'Parent' },
  { to: '/connect', label: 'Connect' },
]

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
    isActive
      ? 'bg-primary-700 text-white shadow-sm'
      : 'text-primary-700 hover:bg-primary-50',
  ].join(' ')

const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-full px-4 py-2.5 text-base font-semibold transition-colors',
    isActive
      ? 'bg-primary-700 text-white shadow-sm'
      : 'text-primary-700 hover:bg-primary-50',
  ].join(' ')

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-primary-100 bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink
          to="/"
          className="font-heading text-xl font-bold tracking-tight text-primary-700"
          onClick={() => setOpen(false)}
        >
          Ishaaro
        </NavLink>

        <ul className="hidden items-center gap-1 rounded-full border border-primary-100 bg-white p-1 shadow-sm md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === '/'} className={linkClasses}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href="/connect"
          className="hidden rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-600 md:inline-block"
        >
          Get Started
        </a>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-full border border-primary-100 p-2 text-primary-700 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="border-t border-primary-100 bg-background px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 pt-3">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={mobileLinkClasses}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
