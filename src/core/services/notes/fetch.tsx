import React, { Dispatch, useCallback, useEffect } from 'react'
import { SetStateAction, useAtom } from 'jotai'
import shortid from 'shortid'
import * as misskey from 'misskey-js'

import { timelineAtom } from '@/atoms'
import { stream, channel } from '@/connection'
import { apiGet } from '@/scripts/api'
import { Note, NoteUnion, RenoteUnion } from 'types/Note'
import { toReactNode } from '../MfmParse'
import { LayoutAnimation } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

const JudgementNoteType = (appearNote: misskey.entities.Note): 'note' | 'renote' | 'quoteRenote' | 'unknown' => {
  if (!(appearNote.cw === null)) return 'unknown'
  if (!appearNote.text) return 'renote'
  if (!appearNote.renoteId) return 'note'
  return 'quoteRenote'
}

const TIMELINE_NOTE_MAX_COUNT = 30

const FetchNotes = () => {
  const [notes, setNotes] = useAtom(timelineAtom.note)
  const [shouldGetNote, setShouldGetNote] = useAtom(timelineAtom.shoudGetNote)

  useEffect(() => {
    channel.on('note', note => {
      if (!shouldGetNote) return
      emit(note)
    })

    return () => {
      channel.off('note')
    }
  }, [shouldGetNote])

  const emit = useCallback((note: misskey.entities.Note) => {
    const type = JudgementNoteType(note)

    switch (type) {
      case 'note': {
        const text = toReactNode(note.text ? note.text : note.reply?.text ? note.reply.text : '')
        const reactions = note.reactions ? createReactions(note.reactions) : []

        const newNote: NoteUnion = {
          type: 'note',
          ...note,
          text,
          reactions
        }
        addNotes([{ id: shortid.generate(), note: newNote }])
        break
      }
      //renoteの場合、renoteの内容をnoteにコピーして、renoteしたユーザーをrenoteInfoに保存する
      case 'renote': {
        const text = toReactNode(note.renote?.text ? note.renote.text : '')

        const reactions = note.renote!.reactions ? createReactions(note.renote!.reactions) : []

        const newNote: RenoteUnion = {
          type: 'renote',
          renoteInfo: { id: note.id, createdAt: note.createdAt, user: note.user },
          ...note.renote!,
          text,
          reactions
        }
        addNotes([{ id: shortid.generate(), note: newNote }])
        break
      }
    }
  }, [])

  const addNotes = useCallback((newData: Note[]) => {
    LayoutAnimation.configureNext({
      duration: 500,
      update: { type: 'spring', springDamping: 1 }
    })
    setNotes(prevData => {
      if (prevData.length > TIMELINE_NOTE_MAX_COUNT) {
        prevData = prevData.slice(0, TIMELINE_NOTE_MAX_COUNT)
      }
      return [...newData, ...prevData]
    })
  }, [])

  const createReactions = (reactions: misskey.entities.Note['reactions']): Note['note']['reactions'] => {
    if (!reactions) return []
    const parsedReactions: [string, number][] = Object.entries(reactions)
    return parsedReactions.map(reaction => {
      return { id: shortid.generate(), emoji: reaction[0], count: reaction[1] }
    })
  }

  return <></>
}

export default FetchNotes
