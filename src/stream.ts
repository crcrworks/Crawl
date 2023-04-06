import * as misskey from 'misskey-js'

import { $i } from '@/account'
import { url } from '@/config'

const stream = new misskey.Stream(url, $i ? { token: $i.token } : null)

stream.on('_connected_', () => {
  console.log(`connected: ${url}`)
})

export default stream
