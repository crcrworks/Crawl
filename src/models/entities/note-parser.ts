import * as misskey from 'misskey-js'
import shortid from 'shortid'

import { Note } from '@/types/entities/Note'

export default class NoteParser {
  private readonly appearNote: misskey.entities.Note
  private readonly renote: Note | undefined
  private readonly reactions: Note['reactions']

  constructor(note: misskey.entities.Note) {
    this.appearNote = note
    this.renote = note.renote ? { ...new NoteParser(note.renote).parsedNote() } : undefined
    this.reactions = this.parsedReactions()
  }

  public noteType(): 'note' | 'renote' {
    if (!this.appearNote.text) return 'renote'
    return 'note'
  }

  public parsedNote(): Note {
    switch (this.noteType()) {
      case 'note':
        return {
          type: 'note',
          ...this.appearNote,
          renote: this.renote,
          contentWarning: this.appearNote.cw,
          reactions: this.reactions
        }

      case 'renote':
        return {
          type: 'renote',
          ...this.appearNote.renote!,
          contentWarning: this.appearNote.renote?.cw,
          renoterInfo: {
            ...this.appearNote,
            contentWarning: this.appearNote.cw
          },
          reactions: this.reactions
        }
    }
  }

  public parsedReactions(): Note['reactions'] {
    const reactions = this.noteType() === 'note' ? this.appearNote.reactions : this.appearNote.renote?.reactions

    if (!reactions) return []
    const parsedReactions: [string, number][] = Object.entries(reactions)
    return parsedReactions.map(reaction => {
      return { id: shortid.generate(), emoji: reaction[0], count: reaction[1], isContainsMe: false }
    })
  }
}
