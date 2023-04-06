import * as misskey from 'misskey-js'
import { stream } from '@/stream'

export const main = stream.useChannel('main')
export const localChannel = stream.useChannel('localTimeline')
export const messagingChannel = stream.useChannel('messaging')

export const init = () => {}
