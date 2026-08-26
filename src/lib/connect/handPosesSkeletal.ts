import type { HandPoseId } from './handPoses'

// The original bones-and-joints line-art pose library — kept alongside the
// filled/animated one in handPoses.ts so the user can switch between the two
// illustration styles. Same 12 pose IDs, same semantics, different geometry
// model (explicit finger-joint points instead of a curl/rotate parameter).
type FingerPoints = [number, number][]

interface FingerSet {
  thumb: FingerPoints
  index: FingerPoints
  middle: FingerPoints
  ring: FingerPoints
  pinky: FingerPoints
}

interface SkeletalPoseDefinition {
  /** Optional rotation (degrees) around the wrist, for poses like `wave`. */
  rotate?: number
  fingers: FingerSet
}

// All poses share the same wrist anchor [50, 90] and viewBox, in the same
// bones-and-joints line-art language as HandPoseLoader.
const OPEN_FINGERS: FingerSet = {
  thumb: [[50, 90], [35, 70], [20, 55]],
  index: [[50, 90], [38, 55], [37, 35], [36, 15]],
  middle: [[50, 90], [48, 50], [48, 25], [48, 8]],
  ring: [[50, 90], [58, 52], [59, 28], [60, 12]],
  pinky: [[50, 90], [66, 58], [68, 40], [70, 25]],
}

const CURLED_FINGERS: FingerSet = {
  thumb: [[50, 90], [38, 75], [42, 65]],
  index: [[50, 90], [40, 65], [45, 58], [48, 55]],
  middle: [[50, 90], [46, 62], [50, 55], [52, 52]],
  ring: [[50, 90], [54, 63], [52, 56], [50, 53]],
  pinky: [[50, 90], [60, 66], [56, 58], [52, 55]],
}

const RELAXED_FINGERS: FingerSet = {
  thumb: [[50, 90], [37, 76], [28, 66]],
  index: [[50, 90], [42, 62], [40, 45], [40, 32]],
  middle: [[50, 90], [48, 58], [48, 38], [48, 25]],
  ring: [[50, 90], [54, 59], [55, 40], [55, 28]],
  pinky: [[50, 90], [62, 63], [64, 46], [65, 35]],
}

const FLAT_FINGERS: FingerSet = {
  thumb: [[50, 90], [40, 80], [35, 72]],
  index: [[50, 90], [44, 55], [43, 30], [43, 12]],
  middle: [[50, 90], [48, 52], [48, 25], [48, 8]],
  ring: [[50, 90], [52, 52], [52, 25], [52, 8]],
  pinky: [[50, 90], [56, 55], [57, 30], [57, 12]],
}

export const SKELETAL_HAND_POSES: Record<HandPoseId, SkeletalPoseDefinition> = {
  neutral: { fingers: RELAXED_FINGERS },
  openPalm: { fingers: OPEN_FINGERS },
  wave: { fingers: OPEN_FINGERS, rotate: -14 },
  point: { fingers: { ...CURLED_FINGERS, index: OPEN_FINGERS.index } },
  fist: { fingers: CURLED_FINGERS },
  thumbsUp: {
    fingers: { ...CURLED_FINGERS, thumb: [[50, 90], [30, 75], [15, 60], [8, 45]] },
  },
  present: { fingers: FLAT_FINGERS, rotate: 6 },
  thank: { fingers: OPEN_FINGERS, rotate: 14 },
  beckon: { fingers: { ...CURLED_FINGERS, thumb: OPEN_FINGERS.thumb }, rotate: -15 },
  blockNo: {
    fingers: {
      thumb: CURLED_FINGERS.thumb,
      index: OPEN_FINGERS.index,
      middle: OPEN_FINGERS.middle,
      ring: CURLED_FINGERS.ring,
      pinky: CURLED_FINGERS.pinky,
    },
    rotate: 75,
  },
  twoFingers: {
    fingers: {
      thumb: CURLED_FINGERS.thumb,
      index: OPEN_FINGERS.index,
      middle: OPEN_FINGERS.middle,
      ring: CURLED_FINGERS.ring,
      pinky: CURLED_FINGERS.pinky,
    },
  },
  pinch: {
    fingers: {
      thumb: OPEN_FINGERS.thumb,
      index: OPEN_FINGERS.index,
      middle: CURLED_FINGERS.middle,
      ring: CURLED_FINGERS.ring,
      pinky: CURLED_FINGERS.pinky,
    },
    rotate: 20,
  },
}
