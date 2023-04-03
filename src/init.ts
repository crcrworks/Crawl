import * as misskey from 'misskey-js'

import stream from '@/stream'

const main = stream.useChannel('main')
export const localChannel = stream.useChannel('localTimeline')

export function init() {}
