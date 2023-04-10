import * as misskey from 'misskey-js'
import shortid from 'shortid'

import { Note } from '@/types/Note'

const judgementNoteType = (appearNote: misskey.entities.Note): 'note' | 'renote' | 'quoteRenote' | 'unknown' => {
  if (!(appearNote.cw === null)) return 'unknown'
  if (!appearNote.text) return 'renote'
  if (!appearNote.renoteId) return 'note'
  return 'quoteRenote'
}

const parseToAppNote = (note: misskey.entities.Note): Note => {
  const renote: Note | undefined = note.renote ? { ...parseToAppNote(note.renote) } : undefined

  switch (judgementNoteType(note)) {
    case 'note':
      return {
        type: 'note',
        ...note,
        renote,
        contentWarning: note.cw,
        reactions: [{ id: shortid.generate(), emoji: '', count: 0, isContainsMe: false }]
      }
    case 'renote':
      return {
        type: 'renote',
        ...note.renote!,
        contentWarning: note.renote?.cw,
        renoterInfo: {
          ...note,
          contentWarning: note.cw
        },
        reactions: [{ id: shortid.generate(), emoji: '', count: 0, isContainsMe: false }]
      }
    default:
      return {
        type: 'note',
        ...note,
        renote,
        contentWarning: note.cw,
        reactions: [{ id: shortid.generate(), emoji: '', count: 0, isContainsMe: false }]
      }
  }
}

export const parseToAppReaction = (reactions: misskey.entities.Note['reactions']): Note['reactions'] => {
  if (!reactions) return []
  const parsedReactions: [string, number][] = Object.entries(reactions)
  return parsedReactions.map(reaction => {
    return { id: shortid.generate(), emoji: reaction[0], count: reaction[1], isContainsMe: false }
  })
}

export default parseToAppNote
