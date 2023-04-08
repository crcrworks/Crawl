import * as misskey from 'misskey-js'

import { $i } from '@/account'
import { url } from '@/config'

export const stream = new misskey.Stream(url, $i ? { token: $i.token } : null)

stream.on('_connected_', () => {
  console.log(`connected: ${url}`)
})

export const channel = stream.useChannel('localTimeline')
export const channel2 = stream.useChannel('main')
// export const messagingChannel = stream.useChannel('messaging')
