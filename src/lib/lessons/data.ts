// Structural data only — no display text lives here. Labels, sublabels,
// module titles, intros, and note text are all looked up by id from
// src/i18n/strings.ts (lessons.tabs / lessons.cards / lessons.notes) so the
// page can render fully in English or Gujarati.

export interface FlashcardItem {
  type: 'card'
  id: string
  index: string
  glyph?: string
  completed?: boolean
}

export interface NoteItem {
  type: 'note'
  id: string
}

export type LessonCard = FlashcardItem | NoteItem

export type TabKey = 'alphabet' | 'numbers' | 'math' | 'science'

export interface LessonTab {
  key: TabKey
  cards: LessonCard[]
}

export const LESSON_TABS: LessonTab[] = [
  {
    key: 'alphabet',
    cards: [
      { type: 'card', id: 'alphabet-01', index: '01.', glyph: 'ક', completed: true },
      { type: 'card', id: 'alphabet-02', index: '02.', glyph: 'ખ', completed: true },
      { type: 'card', id: 'alphabet-03', index: '03.', glyph: 'ગ', completed: true },
      { type: 'note', id: 'alphabet-note' },
      { type: 'card', id: 'alphabet-04', index: '04.', glyph: 'ઘ' },
      { type: 'card', id: 'alphabet-05', index: '05.', glyph: 'ઙ' },
      { type: 'card', id: 'alphabet-06', index: '06.', glyph: 'ચ' },
      { type: 'card', id: 'alphabet-07', index: '07.', glyph: 'છ' },
      { type: 'card', id: 'alphabet-08', index: '08.', glyph: 'જ' },
    ],
  },
  {
    key: 'numbers',
    cards: [
      { type: 'card', id: 'numbers-01', index: '01.', glyph: '૧', completed: true },
      { type: 'card', id: 'numbers-02', index: '02.', glyph: '૨', completed: true },
      { type: 'card', id: 'numbers-03', index: '03.', glyph: '૩', completed: true },
      { type: 'card', id: 'numbers-04', index: '04.', glyph: '૪', completed: true },
      { type: 'note', id: 'numbers-note' },
      { type: 'card', id: 'numbers-05', index: '05.', glyph: '૫' },
      { type: 'card', id: 'numbers-06', index: '06.', glyph: '૬' },
      { type: 'card', id: 'numbers-07', index: '07.', glyph: '૭' },
      { type: 'card', id: 'numbers-08', index: '08.', glyph: '૮' },
      { type: 'card', id: 'numbers-09', index: '09.', glyph: '૯' },
      { type: 'card', id: 'numbers-10', index: '10.', glyph: '૧૦' },
    ],
  },
  {
    key: 'math',
    cards: [
      { type: 'card', id: 'math-01', index: '01.', completed: true },
      { type: 'card', id: 'math-02', index: '02.', completed: true },
      { type: 'note', id: 'math-note' },
      { type: 'card', id: 'math-03', index: '03.' },
      { type: 'card', id: 'math-04', index: '04.' },
      { type: 'card', id: 'math-05', index: '05.' },
    ],
  },
  {
    key: 'science',
    cards: [
      { type: 'card', id: 'science-01', index: '01.', completed: true },
      { type: 'card', id: 'science-02', index: '02.', completed: true },
      { type: 'note', id: 'science-note' },
      { type: 'card', id: 'science-03', index: '03.' },
      { type: 'card', id: 'science-04', index: '04.' },
    ],
  },
]
