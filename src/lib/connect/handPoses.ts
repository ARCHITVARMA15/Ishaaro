// Shared pose library for the Sign Avatar flipbook. Each pose is just "which
// digits are up" plus an optional whole-hand tilt — not bespoke artwork per
// sentence — so sentences compose sequences from this fixed set instead of
// needing unique illustrations.
export type HandPoseId =
  | 'neutral'
  | 'wave'
  | 'openPalm'
  | 'present'
  | 'point'
  | 'fist'
  | 'thumbsUp'
  | 'thank'
  | 'beckon'
  | 'blockNo'
  | 'twoFingers'
  | 'pinch'

export type DigitState = 'curled' | 'relaxed' | 'extended'
export type ThumbState = 'curled' | 'relaxed' | 'extended' | 'up'

export interface HandIconPose {
  thumb: ThumbState
  index: DigitState
  middle: DigitState
  ring: DigitState
  pinky: DigitState
  /** Whole-hand tilt in degrees, e.g. the greeting wave or a sideways "no". */
  rotate?: number
}

export const HAND_POSES: Record<HandPoseId, HandIconPose> = {
  neutral: {
    thumb: 'relaxed',
    index: 'relaxed',
    middle: 'relaxed',
    ring: 'relaxed',
    pinky: 'relaxed',
  },
  wave: {
    thumb: 'extended',
    index: 'extended',
    middle: 'extended',
    ring: 'relaxed',
    pinky: 'relaxed',
    rotate: -22,
  },
  openPalm: {
    thumb: 'extended',
    index: 'extended',
    middle: 'extended',
    ring: 'extended',
    pinky: 'extended',
  },
  present: {
    thumb: 'curled',
    index: 'extended',
    middle: 'extended',
    ring: 'extended',
    pinky: 'curled',
    rotate: 6,
  },
  point: {
    thumb: 'curled',
    index: 'extended',
    middle: 'curled',
    ring: 'curled',
    pinky: 'curled',
  },
  fist: {
    thumb: 'curled',
    index: 'curled',
    middle: 'curled',
    ring: 'curled',
    pinky: 'curled',
  },
  thumbsUp: {
    thumb: 'up',
    index: 'curled',
    middle: 'curled',
    ring: 'curled',
    pinky: 'curled',
  },
  thank: {
    thumb: 'extended',
    index: 'extended',
    middle: 'extended',
    ring: 'extended',
    pinky: 'extended',
    rotate: 14,
  },
  beckon: {
    thumb: 'extended',
    index: 'curled',
    middle: 'curled',
    ring: 'curled',
    pinky: 'curled',
    rotate: -15,
  },
  blockNo: {
    thumb: 'curled',
    index: 'extended',
    middle: 'extended',
    ring: 'curled',
    pinky: 'curled',
    rotate: 75,
  },
  twoFingers: {
    thumb: 'curled',
    index: 'extended',
    middle: 'extended',
    ring: 'curled',
    pinky: 'curled',
  },
  pinch: {
    thumb: 'extended',
    index: 'extended',
    middle: 'curled',
    ring: 'curled',
    pinky: 'curled',
    rotate: 20,
  },
}
