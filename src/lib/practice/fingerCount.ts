export interface HandLandmark {
  x: number
  y: number
  z: number
}

// MediaPipe's 21-point hand model.
const WRIST = 0
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

// A tip must sit at least this much farther out than its own reference joint
// to count as "extended" — gives noisy/imperfectly-curled frames some slack
// instead of flipping on a razor's edge.
const EXTENSION_MARGIN = 1.15

function distance(a: HandLandmark, b: HandLandmark): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

/**
 * A finger is extended when its tip is meaningfully farther from the wrist
 * than its PIP joint is. Unlike a raw y-position comparison, this holds
 * regardless of how the hand is rotated or tilted in frame — a curled finger
 * folds its tip back toward the wrist no matter which way the hand is facing.
 */
function isFingerExtended(
  landmarks: HandLandmark[],
  wrist: HandLandmark,
  tipIndex: number,
  pipIndex: number,
): boolean {
  const tipDistance = distance(landmarks[tipIndex], wrist)
  const pipDistance = distance(landmarks[pipIndex], wrist)
  return tipDistance > pipDistance * EXTENSION_MARGIN
}

function isThumbExtended(landmarks: HandLandmark[]): boolean {
  // 2D distance from the palm center, not just x-distance — the thumb splays
  // sideways relative to the palm, but "sideways" rotates along with the
  // hand, so the x-axis alone isn't a stable proxy for it once the hand
  // tilts. Full 2D distance holds regardless of hand orientation.
  const palmCenter: HandLandmark = {
    x:
      (landmarks[INDEX_MCP].x +
        landmarks[MIDDLE_MCP].x +
        landmarks[RING_MCP].x +
        landmarks[PINKY_MCP].x) /
      4,
    y:
      (landmarks[INDEX_MCP].y +
        landmarks[MIDDLE_MCP].y +
        landmarks[RING_MCP].y +
        landmarks[PINKY_MCP].y) /
      4,
    z: 0,
  }

  const thumbTipDistance = distance(landmarks[THUMB_TIP], palmCenter)
  const thumbBaseDistance = distance(landmarks[THUMB_MCP], palmCenter)

  return thumbTipDistance > thumbBaseDistance * EXTENSION_MARGIN
}

/**
 * Pure function: given the 21 normalized MediaPipe hand landmarks, returns
 * how many fingers are extended (0-5). The four fingers are judged by how far
 * their tip sits from the wrist relative to their PIP joint; the thumb by 2D
 * distance from the palm center instead, since it splays sideways rather
 * than outward from the wrist. Both measures are plain Euclidean distances
 * between landmarks, so the result holds regardless of how the hand is
 * rotated or tilted toward the camera.
 */
export function countExtendedFingers(landmarks: HandLandmark[]): number {
  if (!landmarks || landmarks.length < 21) return 0

  const wrist = landmarks[WRIST]
  const fingers = [
    isThumbExtended(landmarks),
    isFingerExtended(landmarks, wrist, INDEX_TIP, INDEX_PIP),
    isFingerExtended(landmarks, wrist, MIDDLE_TIP, MIDDLE_PIP),
    isFingerExtended(landmarks, wrist, RING_TIP, RING_PIP),
    isFingerExtended(landmarks, wrist, PINKY_TIP, PINKY_PIP),
  ]

  return fingers.filter(Boolean).length
}

export interface NumeralTarget {
  value: number
  // The target sign glyph itself — actual content being taught, not UI
  // chrome, so it doesn't change with the interface language. The display
  // label (e.g. "Five (5)" / "પાંચ (5)") lives in src/i18n/strings.ts
  // instead, keyed by `value`, alongside the corrective tips.
  gujarati: string
}

export const NUMERAL_TARGETS: NumeralTarget[] = [
  { value: 1, gujarati: '૧' },
  { value: 2, gujarati: '૨' },
  { value: 3, gujarati: '૩' },
  { value: 4, gujarati: '૪' },
  { value: 5, gujarati: '૫' },
]
