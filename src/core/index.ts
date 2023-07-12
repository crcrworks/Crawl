import '@/api/note'
import '@/api/reaction'
import '@/core/connection'

import store from '@/redux/store'
import { setEmojis } from '@/redux/reducer/emojis'
store.dispatch(setEmojis())

