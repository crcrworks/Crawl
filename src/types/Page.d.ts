import { User } from './User'

export declare type Page = {
  id: string
  createdAt: string
  updatedAt: string
  userId: User['id']
  user: User
  content: Record<string, any>[]
  variables: Record<string, any>[]
  title: string
  name: string
  summary: string
  hideTitleWhenPinned: boolean
  alignCenter: boolean
  font: string
  script: string
  eyeCatchingImageId: DriveFile['id'] | null
  eyeCatchingImage: DriveFile | null
  attachedFiles: any
  linkedCount: number
  isLiked?: boolean
}
