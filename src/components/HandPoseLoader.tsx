interface Finger {
  name: string
  points: [number, number][]
}

// A simplified, stylized hand skeleton (wrist + 5 fingers), in the same
// bones-and-joints language as the live MediaPipe overlay on /practice,
// just hand-drawn as a fixed pose instead of tracked from a real hand.
const FINGERS: Finger[] = [
  {
    name: 'thumb',
    points: [
      [50, 90],
      [35, 70],
      [20, 55],
    ],
  },
  {
    name: 'index',
    points: [
      [50, 90],
      [38, 55],
      [37, 35],
      [36, 15],
    ],
  },
  {
    name: 'middle',
    points: [
      [50, 90],
      [48, 50],
      [48, 25],
      [48, 8],
    ],
  },
  {
    name: 'ring',
    points: [
      [50, 90],
      [58, 52],
      [59, 28],
      [60, 12],
    ],
  },
  {
    name: 'pinky',
    points: [
      [50, 90],
      [66, 58],
      [68, 40],
      [70, 25],
    ],
  },
]

function toPath(points: [number, number][]) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
}

interface HandPoseLoaderProps {
  size?: number
  className?: string
  lineColor?: string
  dotColor?: string
  label?: string
}

export default function HandPoseLoader({
  size = 96,
  className,
  lineColor = '#1b4b43',
  dotColor = '#ff8c5a',
  label = 'Loading',
}: HandPoseLoaderProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="status"
      aria-label={label}
    >
      {FINGERS.map((finger, i) => (
        <path
          key={finger.name}
          d={toPath(finger.points)}
          fill="none"
          stroke={lineColor}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="hand-loader-line"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
      <circle
        cx={50}
        cy={90}
        r={4.5}
        fill={dotColor}
        className="hand-loader-dot"
        style={{ animationDelay: '0s' }}
      />
      {FINGERS.map((finger, i) => {
        const [tx, ty] = finger.points[finger.points.length - 1]
        return (
          <circle
            key={`${finger.name}-tip`}
            cx={tx}
            cy={ty}
            r={4}
            fill={dotColor}
            className="hand-loader-dot"
            style={{ animationDelay: `${i * 0.12 + 0.5}s` }}
          />
        )
      })}
    </svg>
  )
}
