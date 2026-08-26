export function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function SearchIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  )
}

export function CoachIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path d="M12 2L22 12L12 22L2 12Z" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function CameraOffIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3l18 18" />
      <path d="M9 6h1.5L12 4h0.5L14 6h3a2 2 0 0 1 2 2v9.5" />
      <path d="M5 6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h11" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  )
}

export function SchoolIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 8l10-5 10 5-10 5-10-5z" />
      <path d="M6 10.5v5c0 1.2 2.7 3 6 3s6-1.8 6-3v-5" />
      <path d="M22 8v6" />
    </svg>
  )
}

export function HandIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12V4.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M12 11V3.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M15 11.5V5.5a1.5 1.5 0 0 1 3 0V14" />
      <path d="M6 12V8.5a1.5 1.5 0 0 1 3 0V14" />
      <path d="M6 14v-1c-1.7 0-3 1.2-3 2.5C3 19 6 21 10 21h2c3.3 0 5-2 5-4.5v-3" />
    </svg>
  )
}

export function ArchiveIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="4" />
      <path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" />
      <path d="M10 12h4" />
    </svg>
  )
}
