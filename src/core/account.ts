import * as misskey from 'misskey-js'

import { TOKEN as TOKENenv } from '@/../env'
import { apiGet } from '../scripts/api'

export const TOKEN = TOKENenv
export let $i: misskey.entities.User

apiGet('i').then(meDetailed => {
  $i = meDetailed
})
