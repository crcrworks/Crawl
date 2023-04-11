import { stream, channel } from '@/core/connection'
import store from '@/redux/store'
import shortid from 'shortid'
import * as Haptics from 'expo-haptics'

import { addNote, addReaction } from '@/redux/reducer/timeline'
import NoteParser from '../../entities/note-parser'
import { Note, NoteUpdatedEvent } from '@/types/Note'
import { $i } from '@/core/account'

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
