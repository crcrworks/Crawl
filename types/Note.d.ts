import * as misskey from 'misskey-js'
import { ReactNode } from 'react'
import { SharedValue } from 'react-native-reanimated'

interface NoteBase extends misskey.entities.Note {
  type: 'note' | 'renote'
  text: ReactNode[]
  reactions: {
    id: string
    emoji: string
    count: number
  }[]
}

export interface NoteUnion extends NoteBase {
  type: 'note'
}

export interface RenoteUnion extends NoteBase {
  type: 'renote'
  renoteInfo: {
    id: misskey.entities.ID
    createdAt: misskey.entities.DateString
    user: misskey.entities.User
  }
}

export type Note = { id: string; note: NoteUnion | RenoteUnion }
