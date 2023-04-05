import * as misskey from 'misskey-js'

import stream from '@/stream'
import { extractCustomEmojisFromMfm } from '@/misc/extract-custom-emojis-from-mfm'

export const main = stream.useChannel('main')
export const localChannel = stream.useChannel('localTimeline')

import noteTest from '@/../note-sample/note.json'

export function init() {
  extractCustomEmojisFromMfm(noteTest.text)
}
