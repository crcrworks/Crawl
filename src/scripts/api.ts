import axios from 'axios'
import * as misskey from 'misskey-js'

import { Endpoints } from 'misskey-js/built/api.types'

const origin = 'https://misskey.io'
import { TOKEN } from '@/../env'

const client = new misskey.api.APIClient({
  origin: origin,
  credential: TOKEN
})

export async function apiGet<E extends keyof misskey.Endpoints, P extends misskey.Endpoints[E]['req']>(
  endpoint: E,
  params?: P,
  credential?: string | null | undefined
) {
  return await client.request(endpoint, params).then(data => {
    return data
  })
}

// const stream = new misskey.Stream('https://misskey.io/', { token: TOKEN })
// const mainChannel = stream.useChannel('main')
// const localChannel = stream.useChannel('localTimeline')

// stream.on('_connected_', () => {
//   console.log('connected')
// })

// localChannel.on('note', note => {
//   console.log(note)
// })

// export function Connection() {}

// axios
//   .get(`https://misskey.io/api/emojis`)
//   .then(res => {
//     console.log('++++++++++++++++++++++++++++++++++++')
//     console.log(res)
//   })
//   .catch(error => {
//     console.log(error)
//   })
