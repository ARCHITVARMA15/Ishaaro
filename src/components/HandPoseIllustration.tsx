import { motion } from 'framer-motion'
import { useId } from 'react'
import { HAND_POSES, type HandPoseId } from '../lib/connect/handPoses'

// Every finger and the thumb are ONE fixed shape each, always drawn at full
// extended length — poses no longer swap between discrete path geometries.
// "Curl" is a continuous 0 (straight) - 1 (folded) value applied as a scale
// transform, and rotation is a continuous degree value — both animated by
// framer-motion, so the hand visibly bends from one pose to the next rather
// than cross-fading between static shapes.
const PALM = { x: 31, y: 44, width: 38, height: 44, rx: 16 }
const WRIST = { x: 40, y: 80, width: 20, height: 16, rx: 7 }
const PALM_TOP_Y = 44
const THUMB_ANCHOR = { x: 31, y: 60 }
const ROTATE_PIVOT = { x: 50, y: 66 }
const TIP_WIDTH_RATIO = 0.6

const SPRING = { type: 'spring' as const, duration: 0.22, bounce: 0.14 }

type FourFingerKey = 'index' | 'middle' | 'ring' | 'pinky'

const FOUR_FINGERS: {
  key: FourFingerKey
  anchorX: number
  baseWidth: number
  rotate: number
  maxLength: number
}[] = [
  { key: 'index', anchorX: 37, baseWidth: 9, rotate: -8, maxLength: 30 },
  { key: 'middle', anchorX: 50, baseWidth: 10, rotate: 0, maxLength: 36 },
  { key: 'ring', anchorX: 62, baseWidth: 9, rotate: 8, maxLength: 30 },
  { key: 'pinky', anchorX: 68, baseWidth: 7, rotate: 16, maxLength: 22 },
]

const CURL: Record<'curled' | 'relaxed' | 'extended', number> = {
  extended: 0,
  relaxed: 0.5,
  curled: 0.88,
}

const THUMB_MAX_LENGTH = 27
const THUMB_ROTATE: Record<'curled' | 'relaxed' | 'extended' | 'up', number> = {
  curled: -95,
  relaxed: -110,
  extended: -125,
  up: -25,
}
const THUMB_CURL: Record<'curled' | 'relaxed' | 'extended' | 'up', number> = {
  curled: 0.7,
  relaxed: 0.42,
  extended: 0,
  up: 0.06,
}

/** Blend a hex color toward white by `amount` (0-1). */
function lighten(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = (n >> 16) & 0xff
  const g = (n >> 8) & 0xff
  const b = n & 0xff
  const mix = (c: number) => Math.round(c + (255 - c) * amount)
  return `#${((1 << 24) + (mix(r) << 16) + (mix(g) << 8) + mix(b)).toString(16).slice(1)}`
}

/** Scale a hex color's channels down by `amount` (0-1) — preserves hue better than subtracting a flat offset. */
function darken(hex: string, amount: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = (n >> 16) & 0xff
  const g = (n >> 8) & 0xff
  const b = n & 0xff
  const mix = (c: number) => Math.round(c * (1 - amount))
  return `#${((1 << 24) + (mix(r) << 16) + (mix(g) << 8) + mix(b)).toString(16).slice(1)}`
}

interface DigitGeometry {
  anchorX: number
  pivotY: number
  baseWidth: number
  tipWidth: number
  length: number
}

/** A tapered capsule: full-width base, rounded narrower tip — always built at full length now. */
function digitFillPath({ anchorX, pivotY, baseWidth, tipWidth, length }: DigitGeometry): string {
  const baseHalf = baseWidth / 2
  const tipHalf = tipWidth / 2
  const tipY = pivotY - length + tipHalf
  return [
    `M ${anchorX - baseHalf} ${pivotY}`,
    `L ${anchorX - tipHalf} ${tipY}`,
    `A ${tipHalf} ${tipHalf} 0 0 1 ${anchorX + tipHalf} ${tipY}`,
    `L ${anchorX + baseHalf} ${pivotY}`,
    'Z',
  ].join(' ')
}

/** Just the rounded-tip arc, for the "light catching the curve" highlight. */
function digitTipHighlightPath({ anchorX, pivotY, tipWidth, length }: DigitGeometry): string {
  const tipHalf = tipWidth / 2
  const tipY = pivotY - length + tipHalf
  return `M ${anchorX - tipHalf} ${tipY} A ${tipHalf} ${tipHalf} 0 0 1 ${anchorX + tipHalf} ${tipY}`
}

/** A short crease where a finger meets the palm. */
function knuckleLinePath(anchorX: number, pivotY: number, halfWidth: number): string {
  return `M ${anchorX - halfWidth * 0.7} ${pivotY + 1.5} Q ${anchorX} ${pivotY - 2} ${anchorX + halfWidth * 0.7} ${pivotY + 1.5}`
}

function Digit({
  anchorX,
  pivotY,
  baseWidth,
  maxLength,
  rotate,
  curl,
  fill,
  highlight,
  glowUrl,
}: {
  anchorX: number
  pivotY: number
  baseWidth: number
  maxLength: number
  rotate: number
  /** 0 = fully extended/straight, 1 = fully curled into the palm. */
  curl: number
  fill: string
  highlight: string
  glowUrl: string
}) {
  const tipWidth = Math.max(2.5, baseWidth * TIP_WIDTH_RATIO)
  const geometry: DigitGeometry = { anchorX, pivotY, baseWidth, tipWidth, length: maxLength }
  const fillD = digitFillPath(geometry)
  const highlightD = digitTipHighlightPath(geometry)

  // Curling shortens (scaleY) more than it narrows (scaleX) — a pure
  // length-only squash reads as a flat blob at high curl amounts.
  const scaleY = 1 - curl * 0.78
  const scaleX = 1 - curl * 0.25
  const highlightOpacity = Math.max(0, 1 - curl * 2.2)

  return (
    <motion.g
      style={{ transformBox: 'view-box', originX: `${anchorX}px`, originY: `${pivotY}px` }}
      animate={{ rotate, scaleX, scaleY }}
      transition={SPRING}
    >
      <path d={fillD} fill={fill} />
      <motion.path
        d={highlightD}
        fill="none"
        stroke={highlight}
        strokeWidth={2}
        strokeLinecap="round"
        filter={glowUrl}
        animate={{ opacity: highlightOpacity }}
        transition={SPRING}
      />
    </motion.g>
  )
}

interface HandPoseIllustrationProps {
  pose: HandPoseId
  size?: number
  className?: string
  /** Base fill for the hand shape — shaded into a soft light-to-dark gradient. */
  lineColor?: string
  /** Outline/glow on extended ("active") digits. */
  dotColor?: string
}

export default function HandPoseIllustration({
  pose,
  size = 120,
  className,
  lineColor = '#1b4b43',
  dotColor = '#ff8c5a',
}: HandPoseIllustrationProps) {
  const def = HAND_POSES[pose]
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, '')
  const gradientId = `hand-grad-${rawId}`
  const glowId = `hand-glow-${rawId}`
  const shadowId = `hand-shadow-${rawId}`

  const lightFill = lighten(lineColor, 0.22)
  const darkFill = darken(lineColor, 0.32)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      // SVGs clip to their viewBox by default — without this the drop
      // shadow's blur gets cut off right at the wrist's bottom edge.
      style={{ overflow: 'visible' }}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="32%" r="80%">
          <stop offset="0%" stopColor={lightFill} />
          <stop offset="100%" stopColor={darkFill} />
        </radialGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.6" floodColor={dotColor} floodOpacity="0.55" />
        </filter>
        <filter id={shadowId} x="-30%" y="-15%" width="160%" height="150%">
          <feDropShadow dx="0" dy="3.5" stdDeviation="2.4" floodColor="#0c1f1b" floodOpacity="0.28" />
        </filter>
      </defs>

      {/* Barely-perceptible idle sway, always running, so the hand never
          looks frozen while holding a pose between transitions. */}
      <g
        className="animate-hand-idle-breathe"
        style={{ transformBox: 'view-box', transformOrigin: '50px 60px' }}
      >
        <motion.g
          style={{
            transformBox: 'view-box',
            originX: `${ROTATE_PIVOT.x}px`,
            originY: `${ROTATE_PIVOT.y}px`,
          }}
          animate={{ rotate: def.rotate ?? 0 }}
          transition={SPRING}
        >
          <g filter={`url(#${shadowId})`}>
            <rect {...PALM} fill={`url(#${gradientId})`} />
            <rect {...WRIST} fill={`url(#${gradientId})`} />
            {FOUR_FINGERS.map((f) => (
              <Digit
                key={f.key}
                anchorX={f.anchorX}
                pivotY={PALM_TOP_Y}
                baseWidth={f.baseWidth}
                maxLength={f.maxLength}
                rotate={f.rotate}
                curl={CURL[def[f.key]]}
                fill={`url(#${gradientId})`}
                highlight={dotColor}
                glowUrl={`url(#${glowId})`}
              />
            ))}
            <Digit
              anchorX={THUMB_ANCHOR.x}
              pivotY={THUMB_ANCHOR.y}
              baseWidth={11}
              maxLength={THUMB_MAX_LENGTH}
              rotate={THUMB_ROTATE[def.thumb]}
              curl={THUMB_CURL[def.thumb]}
              fill={`url(#${gradientId})`}
              highlight={dotColor}
              glowUrl={`url(#${glowId})`}
            />
            {FOUR_FINGERS.map((f) => (
              <path
                key={`knuckle-${f.key}`}
                d={knuckleLinePath(f.anchorX, PALM_TOP_Y, f.baseWidth / 2)}
                fill="none"
                stroke={darkFill}
                strokeWidth={1}
                strokeLinecap="round"
                opacity={0.35}
              />
            ))}
          </g>
        </motion.g>
      </g>
    </svg>
  )
}
