interface StitchFooterProps {
  links?: string[]
  copyright?: string
}

const DEFAULT_LINKS = ['Ethics', 'Privacy', 'Sign Archive', 'Instagram']
const DEFAULT_COPYRIGHT = '© 2024 Ishaaro. Hand-drawn with precision.'

export default function StitchFooter({
  links = DEFAULT_LINKS,
  copyright = DEFAULT_COPYRIGHT,
}: StitchFooterProps) {
  return (
    <footer className="bg-primary-700 px-5 py-12 text-white md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center gap-3 md:items-start">
          <span className="font-heading text-lg font-semibold">Ishaaro</span>
          <span className="text-sm text-white/70">{copyright}</span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {links.map((label) => (
            <a
              key={label}
              href="#"
              className="font-mono text-xs text-white/70 transition-colors hover:text-accent-400 sm:text-sm"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
