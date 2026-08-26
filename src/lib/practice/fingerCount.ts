export interface HandLandmark {
  x: number
  y: number
  z: number
}

// MediaPipe's 21-point hand model. Tip / PIP ("lower knuckle") pairs for the
// four fingers that extend/curl mostly along the y-axis, plus the joints used
// to judge the thumb, which splays sideways instead.
const INDEX_TIP = 8
const INDEX_PIP = 6
const MIDDLE_TIP = 12
const MIDDLE_PIP = 10
const RING_TIP = 16
const RING_PIP = 14
const PINKY_TIP = 20
const PINKY_PIP = 18

const THUMB_TIP = 4
const THUMB_MCP = 2
const INDEX_MCP = 5
const MIDDLE_MCP = 9
const RING_MCP = 13
const PINKY_MCP = 17

function isFingerExtended(
  landmarks: HandLandmark[],
  tipIndex: number,
  pipIndex: number,
): boolean {
  return landmarks[tipIndex].y < landmarks[pipIndex].y
}

function isThumbExtended(landmarks: HandLandmark[]): boolean {
  const palmCenterX =
    (landmarks[INDEX_MCP].x +
      landmarks[MIDDLE_MCP].x +
      landmarks[RING_MCP].x +
      landmarks[PINKY_MCP].x) /
    4

  const thumbTipDistance = Math.abs(landmarks[THUMB_TIP].x - palmCenterX)
  const thumbBaseDistance = Math.abs(landmarks[THUMB_MCP].x - palmCenterX)

  return thumbTipDistance > thumbBaseDistance
}

/**
 * Pure function: given the 21 normalized MediaPipe hand landmarks, returns
 * how many fingers are extended (0-5). Each of the four fingers is judged by
 * comparing its tip's y-position to its PIP joint (the "lower knuckle"); the
 * thumb is judged by x-distance from the palm center instead, since it
 * extends sideways rather than upward.
 */
export function countExtendedFingers(landmarks: HandLandmark[]): number {
  if (!landmarks || landmarks.length < 21) return 0

  const fingers = [
    isThumbExtended(landmarks),
    isFingerExtended(landmarks, INDEX_TIP, INDEX_PIP),
    isFingerExtended(landmarks, MIDDLE_TIP, MIDDLE_PIP),
    isFingerExtended(landmarks, RING_TIP, RING_PIP),
    isFingerExtended(landmarks, PINKY_TIP, PINKY_PIP),
  ]

  return fingers.filter(Boolean).length
}

export interface NumeralTarget {
  value: number
  gujarati: string
  english: string
}

export const NUMERAL_TARGETS: NumeralTarget[] = [
  { value: 1, gujarati: '૧', english: 'One (1)' },
  { value: 2, gujarati: '૨', english: 'Two (2)' },
  { value: 3, gujarati: '૩', english: 'Three (3)' },
  { value: 4, gujarati: '૪', english: 'Four (4)' },
  { value: 5, gujarati: '૫', english: 'Five (5)' },
]

export const CORRECTIVE_TIPS: Record<number, string> = {
  1: 'Try tucking your other fingers in — only the index finger should point up.',
  2: 'Spread your index and middle fingers apart for a clearer V shape.',
  3: 'Keep your thumb, index, and middle fingers extended and the rest curled in.',
  4: 'Extend all four fingers and fold your thumb across your palm.',
  5: 'Try spreading your fingers further apart, palm facing forward.',
}
