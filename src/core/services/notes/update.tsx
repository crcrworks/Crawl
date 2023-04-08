import { useAtom } from 'jotai'
import { useEffect } from 'react'
import shortid from 'shortid'

import { timelineAtom } from '@/atoms'
import { stream } from '@/connection'
import { Note } from '@/../types/Note'
import { LayoutAnimation } from 'react-native'

const UpdateNotes = () => {
  const [notes, setNotes] = useAtom(timelineAtom.note)

  useEffect(() => {
    stream.on('noteUpdated', noteData => {
      if (noteData.type === 'reacted') {
        const emoji = noteData.body.reaction
        LayoutAnimation.configureNext({
          duration: 500,
          update: { type: 'spring', springDamping: 1 }
        })
        setNotes(prevData => {
          const newNotes = [...prevData]
          const index = newNotes.findIndex(item => item.note.id === noteData.id)
          if (index === -1) return [...newNotes]

          const targetData = newNotes[index].note.reactions
          newNotes[index].note.reactions = addReaction(targetData, emoji, shortid.generate())

          return newNotes
        })
      }
    })
  }, [])

  function addReaction(targetData: Note['note']['reactions'], newEmoji: string, newId: string): Note['note']['reactions'] {
    const existingDataIndex = targetData.findIndex(data => data.emoji === newEmoji)
    if (existingDataIndex !== -1) {
      const updatedData = [...targetData]
      updatedData[existingDataIndex].count += 1
      return updatedData
    } else {
      const newData = { id: newId, emoji: newEmoji, count: 1 }
      return [...targetData, newData]
    }
  }

  return <></>
}

export const sendUpdateRequest = (reqType: 'subNote' | 'unsubNote', id: string) => {
  stream.send(reqType, { id })
}

export default UpdateNotes
