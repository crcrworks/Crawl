import { stream } from '@/core/connection'
import store from '@/redux/store'
import * as Haptics from 'expo-haptics'
import shortid from 'shortid'

import { $i } from '@/core/account'
import { addReaction } from '@/redux/reducer/timeline'

stream.on('noteUpdated', data => {
  switch (data.type) {
    case 'reacted':
      const emoji = data.body.reaction

      const isContainsMe = data.body.userId === $i.id
      if (isContainsMe) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)

      //isContainsMeがfalseでも、前回の値がtrueならばtrueのまま維持するようになっている。
      store.dispatch(
        addReaction({
          reaction: {
            id: shortid.generate(),
            emoji: emoji,
            isContainsMe: isContainsMe
          },
          noteId: data.id
        })
      )
      break
  }
})
