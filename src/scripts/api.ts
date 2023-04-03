import axios from 'axios'
import * as misskey from 'misskey-js'
import { Endpoints } from 'misskey-js/built/api.types'

const apiURL = 'https://misskey.io'

function apiGet<E extends keyof Endpoints, P extends Endpoints[E]['req']>(endpoint: E, data: P = {} as any) {
  axios.get(`${apiURL}/${endpoint}`)
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

export function Connection() {}

// axios
//   .get(`https://misskey.io/api/emojis`)
//   .then(res => {
//     console.log('++++++++++++++++++++++++++++++++++++')
//     console.log(res)
//   })
//   .catch(error => {
//     console.log(error)
//   })
