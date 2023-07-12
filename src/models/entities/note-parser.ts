import * as misskey from 'misskey-js'
import shortid from 'shortid'
import axios from 'axios'

import { Note } from '@/types/entities/Note'
import { endEvent } from 'react-native/Libraries/Performance/Systrace'

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
    if (!this.appearNote.text && this.appearNote.user.username) return 'renote'
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
    const reactions =
      this.noteType() === 'note' ? this.appearNote.reactions : this.appearNote.renote?.reactions

    if (!reactions) return []

    const parsedReactions: [string, number][] = Object.entries(reactions)

    return parsedReactions.map(reaction => {
      const reactionCode = reaction[0].match(/:(.*?)(?:@|$)/)?.[1] || ''

      // URLはapi/noteで設定します

      return {
        id: shortid.generate(),
        code: reactionCode,
        count: reaction[1],
        url: 'https://s3.arkjp.net/emoji/iiyo.png',
        isContainsMe: false
      }
    })
  }
}
