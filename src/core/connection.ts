import * as misskey from 'misskey-js'

import { TOKEN, $i } from '@/core/account'
import { url } from '@/core/config'
import { apiGet } from '../scripts/api'

export const stream = new misskey.Stream(url, TOKEN ? { token: TOKEN } : null)

stream.on('_connected_', () => {
  console.log(`connected: ${url}`)
})

export const channel = stream.useChannel('localTimeline')
export const channel2 = stream.useChannel('main')
// export const messagingChannel = stream.useChannel('messaging')
