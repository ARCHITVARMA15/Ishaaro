import type { HandPoseId } from './handPoses'

export interface SignFrame {
  pose: HandPoseId
  /** Word-gloss shown under the avatar while this frame is active. */
  gloss: string
}

export interface SignSentence {
  id: 1 | 2 | 3
  /** Normalized (lowercase, no punctuation) English target for matching. */
  text: string
  /** Normalized (no punctuation) Gujarati target for matching. */
  textGu: string
  /** Nicely-cased English text shown in the caption panel on a match. */
  displayText: string
  /** Nicely-cased Gujarati text shown in the caption panel on a match. */
  displayTextGu: string
  /** 3-5 frames, ~400ms each, played in order as a flipbook. */
  frames: SignFrame[]
}

export const SIGN_SENTENCES: SignSentence[] = [
  {
    id: 1,
    text: 'hello how are you',
    textGu: 'હેલો તમે કેમ છો',
    displayText: 'Hello, how are you?',
    displayTextGu: 'હેલો, તમે કેમ છો?',
    frames: [
      { pose: 'wave', gloss: 'Hello' },
      { pose: 'openPalm', gloss: 'How' },
      { pose: 'flatHandOut', gloss: 'Are' },
      { pose: 'point', gloss: 'You' },
    ],
  },
  {
    id: 2,
    text: 'tomorrow is the exam are you ready',
    textGu: 'કાલે પરીક્ષા છે તમે તૈયાર છો',
    displayText: 'Tomorrow is the exam — are you ready?',
    displayTextGu: 'કાલે પરીક્ષા છે, તમે તૈયાર છો?',
    frames: [
      { pose: 'flatHandOut', gloss: 'Tomorrow' },
      { pose: 'fist', gloss: 'Exam' },
      { pose: 'openPalm', gloss: 'Are' },
      { pose: 'point', gloss: 'You' },
      { pose: 'thumbsUp', gloss: 'Ready' },
    ],
  },
  {
    id: 3,
    text: 'thank you for coming',
    textGu: 'આવવા બદલ આભાર',
    displayText: 'Thank you for coming.',
    displayTextGu: 'આવવા બદલ આભાર.',
    // Starts on a different pose than sentence 2 (`flatHandOut`) so the two
    // sequences don't read as identical if glanced at in their first frame.
    frames: [
      { pose: 'openPalm', gloss: 'Thank' },
      { pose: 'point', gloss: 'You' },
      { pose: 'wave', gloss: 'Come' },
    ],
  },
]
