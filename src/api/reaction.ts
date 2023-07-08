import shortid from 'shortid'

import store from '@/redux/store'
import { addReaction } from '@/redux/reducer/timeline'

export const sendReaction = async (noteId: string, reaction: string) => {
  store.dispatch(addReaction({
    reaction: {
      id: shortid.generate(),
      emoji: reaction,
      isContainsMe: true
    },
    noteId
  }))
}
