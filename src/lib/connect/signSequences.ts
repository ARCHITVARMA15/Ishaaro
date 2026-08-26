import type { HandPoseId } from './handPoses'

export interface SignFrame {
  pose: HandPoseId
  /** Word-gloss shown under the avatar while this frame is active. */
  gloss: string
}

export interface SignSentence {
  id: number
  /** Normalized (lowercase, no punctuation) English target for matching. */
  text: string
  /** Normalized (no punctuation) Gujarati target for matching, if provided. */
  textGu?: string
  /** Nicely-cased English text shown in the caption panel on a match. */
  displayText: string
  /** Nicely-cased Gujarati text shown in the caption panel on a match. */
  displayTextGu?: string
  /** 2-5 frames, ~400ms each, played in order as a flipbook. */
  frames: SignFrame[]
}

// Frame sequences are built entirely from the 12-pose shared library in
// handPoses.ts — no sentence gets bespoke artwork. The same gloss word
// always maps to the same pose everywhere it appears (e.g. "You" is always
// `point`), and no two frames within a single sentence share a pose, so the
// flipbook never appears to "stick" on a repeated frame.
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
      { pose: 'present', gloss: 'Are' },
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
      { pose: 'beckon', gloss: 'Tomorrow' },
      { pose: 'fist', gloss: 'Exam' },
      { pose: 'present', gloss: 'Are' },
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
    frames: [
      { pose: 'thank', gloss: 'Thank' },
      { pose: 'point', gloss: 'You' },
      { pose: 'beckon', gloss: 'Coming' },
    ],
  },
  {
    id: 4,
    text: 'good morning',
    textGu: 'શુભ સવાર',
    displayText: 'Good morning.',
    displayTextGu: 'શુભ સવાર.',
    frames: [
      { pose: 'openPalm', gloss: 'Good' },
      { pose: 'present', gloss: 'Morning' },
    ],
  },
  {
    id: 5,
    text: 'welcome to the class',
    textGu: 'વર્ગમાં આપનું સ્વાગત છે',
    displayText: 'Welcome to the class.',
    displayTextGu: 'વર્ગમાં આપનું સ્વાગત છે.',
    frames: [
      { pose: 'wave', gloss: 'Welcome' },
      { pose: 'present', gloss: 'Class' },
    ],
  },
  {
    id: 6,
    text: 'yes i understand',
    textGu: 'હા મને સમજાય છે',
    displayText: 'Yes, I understand.',
    displayTextGu: 'હા, મને સમજાય છે.',
    frames: [
      { pose: 'thumbsUp', gloss: 'Yes' },
      { pose: 'twoFingers', gloss: 'Understand' },
    ],
  },
  {
    id: 7,
    // Written as "dont" (no apostrophe) — normalizeForMatch strips
    // punctuation, so a stored "don't" would split into stray "don" + "t"
    // tokens. A real ASR transcript of "don't" normalizes to "don"+"t" too,
    // and "dont" fuzzy-matches "don" within the word-tolerance check, so
    // this stays robust to the contraction either way.
    text: 'no i dont understand',
    textGu: 'ના મને સમજાતું નથી',
    displayText: "No, I don't understand.",
    displayTextGu: 'ના, મને સમજાતું નથી.',
    frames: [
      { pose: 'blockNo', gloss: 'No' },
      { pose: 'twoFingers', gloss: 'Understand' },
    ],
  },
  {
    id: 8,
    text: 'can you repeat that',
    textGu: 'શું તમે તે ફરીથી કહેશો',
    displayText: 'Can you repeat that?',
    displayTextGu: 'શું તમે તે ફરીથી કહેશો?',
    frames: [
      { pose: 'thumbsUp', gloss: 'Can' },
      { pose: 'point', gloss: 'You' },
      { pose: 'pinch', gloss: 'Repeat' },
    ],
  },
  {
    id: 9,
    text: 'well done',
    textGu: 'શાબાશ',
    displayText: 'Well done!',
    displayTextGu: 'શાબાશ!',
    frames: [
      { pose: 'thumbsUp', gloss: 'Well' },
      { pose: 'fist', gloss: 'Done' },
    ],
  },
  {
    id: 10,
    text: 'see you tomorrow',
    textGu: 'કાલે મળીશું',
    displayText: 'See you tomorrow.',
    displayTextGu: 'કાલે મળીશું.',
    frames: [
      { pose: 'openPalm', gloss: 'See' },
      { pose: 'point', gloss: 'You' },
      { pose: 'beckon', gloss: 'Tomorrow' },
    ],
  },
]
