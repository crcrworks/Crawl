import axios from 'axios'
import * as misskey from 'misskey-js'

// const TOKEN = 'gZo6lLYe8jCV8Q1BDCddi4wV9RiSQYGC'
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
