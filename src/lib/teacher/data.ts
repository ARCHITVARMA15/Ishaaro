export interface StatCard {
  label: string
  target: number
  delta: string
  sparklinePath: string
}

export const STAT_CARDS: StatCard[] = [
  {
    label: 'Gujarati Literacy',
    target: 29,
    delta: '+11% vs last term',
    sparklinePath: 'M0 40 Q 20 40 30 20 T 60 30 T 100 10',
  },
  {
    label: 'Mathematics',
    target: 28,
    delta: '+9% vs last term',
    sparklinePath: 'M0 45 L 20 35 L 40 40 L 70 15 L 100 5',
  },
  {
    label: 'Sign Vocabulary',
    target: 37,
    delta: '+14% vs last term',
    sparklinePath: 'M0 40 Q 25 10 50 25 T 100 5',
  },
]

export interface Student {
  initials: string
  name: string
  focus: string
  score: number
}

export const STUDENTS: Student[] = [
  { initials: 'EM', name: 'Elena M.', focus: 'Kinetic Flow', score: 72 },
  { initials: 'JS', name: 'Julian S.', focus: 'Facial Expression', score: 68 },
  { initials: 'AT', name: 'Aria T.', focus: 'Syntax Structure', score: 78 },
  { initials: 'KL', name: 'Kai L.', focus: 'Speed Pacing', score: 81 },
  { initials: 'RP', name: 'Riya P.', focus: 'Gujarati Literacy', score: 85 },
  { initials: 'DM', name: 'Dev M.', focus: 'Sign Vocabulary', score: 74 },
]

export interface AssessmentDatum {
  skill: string
  pre: number
  after: number
}

export const ASSESSMENT_DATA: AssessmentDatum[] = [
  { skill: 'Gujarati Literacy', pre: 12, after: 68 },
  { skill: 'Mathematics', pre: 18, after: 61 },
  { skill: 'Sign Vocabulary', pre: 9, after: 74 },
  { skill: 'Sentence Structure', pre: 15, after: 58 },
]
