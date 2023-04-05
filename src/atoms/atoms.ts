import { atom } from 'jotai'

export const TopTabIndexAtom = atom(0)
export const TopTabNumberAtom = atom(0)
export const BottomTabIndicatorIndexAtom = atom(0)

export const OpenReactionScreenAtom = atom({ isOpen: false, noteId: '' })
