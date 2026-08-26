import { useId } from 'react'
import { SKELETAL_HAND_POSES } from '../lib/connect/handPosesSkeletal'
import type { HandPoseId } from '../lib/connect/handPoses'

function toPath(points: [number, number][]) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
}

interface HandPoseIllustrationSkeletalProps {
  pose: HandPoseId
  size?: number
  className?: string
  lineColor?: string
  dotColor?: string
}

export default function HandPoseIllustrationSkeletal({
  pose,
  size = 120,
  className,
  lineColor = '#1b4b43',
  dotColor = '#ff8c5a',
}: HandPoseIllustrationSkeletalProps) {
  const def = SKELETAL_HAND_POSES[pose]
  const fingers = Object.values(def.fingers)
  const glowId = useId()

  return (
    <svg
      // Remounting on every pose change replays the pulse-in keyframe below,
      // so each flipbook frame settles into place instead of hard-cutting.
      key={pose}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={['animate-hand-pose-pulse', className].filter(Boolean).join(' ')}
      aria-hidden="true"
    >
      <defs>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor={dotColor} floodOpacity="0.8" />
        </filter>
      </defs>
      <g transform={def.rotate ? `rotate(${def.rotate} 50 90)` : undefined}>
        {fingers.map((points, i) => (
          <path
            key={i}
            d={toPath(points)}
            fill="none"
            stroke={lineColor}
            strokeWidth={4.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        <g filter={`url(#${glowId})`}>
          <circle cx={50} cy={90} r={4.5} fill={dotColor} />
          {fingers.map((points, i) => {
            const [tx, ty] = points[points.length - 1]
            return <circle key={`tip-${i}`} cx={tx} cy={ty} r={4} fill={dotColor} />
          })}
        </g>
      </g>
    </svg>
  )
}
