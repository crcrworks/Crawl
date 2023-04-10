import * as misskey from 'misskey-js'

import { Note } from '@/types/Note'
import shortid from 'shortid'

export class Parser {
  public misskeyNoteToAppNote = (note: misskey.entities.Note): Note => {
    switch (this.judgementNoteType(note)) {
      case 'note':
        return {
          type: 'note',
          ...note,
          contentWarning: note.cw,
          reactions: [{ id: shortid.generate(), emoji: '', count: 0, isContainsMe: false }]
        }
      case 'renote':
        return {
          type: 'renote',
          ...note.renote!,
          contentWarning: note.renote!.cw,
          renoteInfo: {
            ...note,
            contentWarning: note.cw
          },
          reactions: [{ id: shortid.generate(), emoji: '', count: 0, isContainsMe: false }]
        }
      default:
        return {
          type: 'note',
          ...note,
          contentWarning: note.cw,
          reactions: [{ id: shortid.generate(), emoji: '', count: 0, isContainsMe: false }]
        }
    }
  }

  convertReaction = (reactions: misskey.entities.Note['reactions']): Note['reactions'] => {
    if (!reactions) return []
    const parsedReactions: [string, number][] = Object.entries(reactions)
    return parsedReactions.map(reaction => {
      return { id: shortid.generate(), emoji: reaction[0], count: reaction[1], isContainsMe: false }
    })
  }

  judgementNoteType = (appearNote: misskey.entities.Note): 'note' | 'renote' | 'quoteRenote' | 'unknown' => {
    if (!(appearNote.cw === null)) return 'unknown'
    if (!appearNote.text) return 'renote'
    if (!appearNote.renoteId) return 'note'
    return 'quoteRenote'
  }
}

export default new Parser()
