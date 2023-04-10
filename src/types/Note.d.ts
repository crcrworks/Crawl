import * as misskey from 'misskey-js'
import { ReactNode } from 'react'
import { SharedValue } from 'react-native-reanimated'
import { DriveFile } from './DriveFile'

type NoteBase = {
  id: string
  createdAt: string
  text: string | null
  contentWarning: string | null
  user: User
  userId: User
  files: DriveFile[]
  fileIds: DriveFile['id'][]
  visibility: 'public' | 'home' | 'followers' | 'specified'
  visibleUserIds?: User['id'][]
  localOnly?: boolean
  myReaction?: string
  reactions: Reactions
  renoteCount: number
  repliesCount: number
  poll?: {
    expiresAt: string | null
    multiple: boolean
    choices: {
      isVoted: boolean
      text: string
      votes: number
    }[]
  }
  emojis: {
    name: string
    url: string
  }[]
  uri?: string
  url?: string
  isHidden?: boolean
}

type Reactions = {
  id: string
  emoji: string
  count: number
  isContainsMe: boolean
}[]

interface NoteUnion extends NoteBase {
  type: 'note'
}

interface RenoteUnion extends NoteBase {
  type: 'renote'
  renoteInfo: Omit<NoteBase, 'reactions'>
}

export type Note = NoteUnion | RenoteUnion

// interface NoteBase extends misskey.entities.Note {
//   type: 'note' | 'renote'
//   text: ReactNode[]
//   reactions: {
//     id: string
//     emoji: string
//     count: number
//     isContainsMe: boolean
//   }[]
// }

// export interface NoteUnion extends NoteBase {
//   type: 'note'
// }

// export interface RenoteUnion extends NoteBase {
//   type: 'renote'
//   renoteInfo: {
//     id: misskey.entities.ID
//     createdAt: misskey.entities.DateString
//     user: misskey.entities.User
//   }
// }

// export type Note = { id: string; note: NoteUnion | RenoteUnion }

export declare type NoteUpdatedEvent =
  | {
      id: Note['id']
      type: 'reacted'
      body: {
        reaction: string
        userId: User['id']
      }
    }
  | {
      id: Note['id']
      type: 'unreacted'
      body: {
        reaction: string
        userId: User['id']
      }
    }
  | {
      id: Note['id']
      type: 'deleted'
      body: {
        deletedAt: string
      }
    }
  | {
      id: Note['id']
      type: 'pollVoted'
      body: {
        choice: number
        userId: User['id']
      }
    }
