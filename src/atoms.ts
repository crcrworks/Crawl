import { atom } from 'jotai'

import { Note } from '@/types/Note'

export const timelineAtom = {
  note: atom<Note[]>([]),
  shoudGetNote: atom(true)
}
