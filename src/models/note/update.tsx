import React, { useCallback } from 'react'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import shortid from 'shortid'
import * as misskey from 'misskey-js'
import * as Haptics from 'expo-haptics'

import { $i } from '@/core/account'
import { timelineAtom } from '@/atoms'
import { stream } from '@/core/connection'
import { Note, NoteUpdatedEvent } from '@/types/Note'
import { LayoutAnimation } from 'react-native'

const UpdateNotes = () => {
  const [notes, setNotes] = useAtom(timelineAtom.note)

  useEffect(() => {
    stream.on('noteUpdated', updateData => {
      switch (updateData.type) {
        case 'reacted':
          updateReaction(updateData)
          break
      }
    })
  }, [])

  const updateReaction = useCallback((updateData: NoteUpdatedEvent) => {
    if (updateData.type !== 'reacted') return

    const emoji = updateData.body.reaction
    setNotes(prevData => {
      const newNotes = [...prevData]
      //更新するnoteのindexを特定。特定できなければそのままreturn
      const index = newNotes.findIndex(item => item.note.id === updateData.id)
      if (index === -1) return [...newNotes]

      //DataのReactionを上書き
      const targetData = newNotes[index].note.reactions
      newNotes[index].note.reactions = createReactionData(targetData, emoji, updateData.body.userId, shortid.generate())

      return newNotes
    })
  }, [])

  return <></>
}

const createReactionData = (targetData: Note['note']['reactions'], newEmoji: string, userId: string, newId: string): Note['note']['reactions'] => {
  const existingDataIndex = targetData.findIndex(data => data.emoji === newEmoji)
  const isContainsMe = userId === $i.id

  if (isContainsMe) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }
  if (existingDataIndex !== -1) {
    const updatedData = [...targetData]
    updatedData[existingDataIndex].count += 1
    updatedData[existingDataIndex].isContainsMe = isContainsMe

    return updatedData
  } else {
    const newData = { id: newId, emoji: newEmoji, count: 1, isContainsMe }
    return [...targetData, newData]
  }
}

export const sendUpdateRequest = (reqType: 'subNote' | 'unsubNote', id: string) => {
  stream.send(reqType, { id })
}

export default UpdateNotes
