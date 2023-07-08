export declare type Instance = {
  id: string
  caughtAt: string
  host: string
  usersCount: number
  notesCount: number
  followingCount: number
  followersCount: number
  driveUsage: number
  driveFiles: number
  latestRequestSentAt: string | null
  latestStatus: number | null
  latestRequestReceivedAt: string | null
  lastCommunicatedAt: string
  isNotResponding: boolean
  isSuspended: boolean
  softwareName: string | null
  softwareVersion: string | null
  openRegistrations: boolean | null
  name: string | null
  description: string | null
  maintainerName: string | null
  maintainerEmail: string | null
  iconUrl: string | null
  faviconUrl: string | null
  themeColor: string | null
  infoUpdatedAt: string | null
}
