import { Link } from 'react-router-dom'
import { ArrowIcon } from './icons'

const navLinks = ['Curriculum', 'Technology', 'Philosophy', 'Archive']

export default function StitchHeader() {
  return (
    <header className="relative z-40 border-b border-primary-900 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-16">
        <Link
          to="/landingpage"
          className="font-heading text-lg font-bold uppercase tracking-tight text-primary-900"
        >
          Ishaaro
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((label) => (
            <a
              key={label}
              href="#"
              className="font-mono text-sm tracking-wide text-primary-900/70 transition-colors hover:text-accent-600"
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="flex items-center gap-2 bg-primary-700 px-5 py-3 font-body text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary-800"
        >
          Start Learning
          <ArrowIcon className="h-4 w-4" />
        </button>
      </div>
    </header>
  )
}
