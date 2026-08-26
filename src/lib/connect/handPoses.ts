export type HandPoseId =
  | 'neutral'
  | 'openPalm'
  | 'wave'
  | 'point'
  | 'fist'
  | 'thumbsUp'
  | 'flatHandOut'

type FingerPoints = [number, number][]

interface FingerSet {
  thumb: FingerPoints
  index: FingerPoints
  middle: FingerPoints
  ring: FingerPoints
  pinky: FingerPoints
}

interface PoseDefinition {
  /** Optional rotation (degrees) around the wrist, for poses like `wave`. */
  rotate?: number
  fingers: FingerSet
}

// All poses share the same wrist anchor [50, 90] and viewBox, in the same
// bones-and-joints line-art language as HandPoseLoader — just fixed frames
// instead of a looping draw-in animation.
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

export const HAND_POSES: Record<HandPoseId, PoseDefinition> = {
  neutral: { fingers: RELAXED_FINGERS },
  openPalm: { fingers: OPEN_FINGERS },
  wave: { fingers: OPEN_FINGERS, rotate: -14 },
  point: { fingers: { ...CURLED_FINGERS, index: OPEN_FINGERS.index } },
  fist: { fingers: CURLED_FINGERS },
  thumbsUp: {
    fingers: { ...CURLED_FINGERS, thumb: [[50, 90], [30, 75], [15, 60], [8, 45]] },
  },
  flatHandOut: { fingers: FLAT_FINGERS },
}
