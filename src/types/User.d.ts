import { Instance } from './Instance'

export declare type User = UserLite | UserDetailed

export declare type UserLite = {
  id: string
  username: string
  host: string | null
  name: string
  onlineStatus: 'online' | 'active' | 'offline' | 'unknown'
  avatarUrl: string
  avatarBlurhash: string
  emojis: {
    name: string
    url: string
  }[]
  instance?: {
    name: Instance['name']
    softwareName: Instance['softwareName']
    softwareVersion: Instance['softwareVersion']
    iconUrl: Instance['iconUrl']
    faviconUrl: Instance['faviconUrl']
    themeColor: Instance['themeColor']
  }
}

export declare type UserDetailed = UserLite & {
  bannerBlurhash: string | null
  bannerColor: string | null
  bannerUrl: string | null
  birthday: string | null
  createdAt: string
  description: string | null
  ffVisibility: 'public' | 'followers' | 'private'
  fields: {
    name: string
    value: string
  }[]
  followerCount: number
  followingCount: number
  hasPendingFollowRequestFromYou: boolean
  hasPendingFollowRequestToYou: boolean
  isAdmin: boolean
  isBlocked: boolean
  isBot: boolean
  isCat: boolean
  isFollowed: boolean
  isFollowing: boolean
  isLocked: boolean
  isModerator: boolean
  isMuted: boolean
  isSilenced: boolean
  isSuspended: boolean
  lang: string | null
  lastFetchedAt?: string
  location: string | null
  notesCount: number
  pinnedNoteIds: ID[]
  pinnedNotes: Note[]
  pinnedPage: Page | null
  pinnedPageId: string | null
  publicReractions: boolean
  updatedAt: string | null
  uri: string | null
  url: string | null
}
