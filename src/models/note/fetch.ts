import React, { Dispatch, useCallback, useEffect } from 'react'
import { SetStateAction, useAtom } from 'jotai'
import shortid from 'shortid'
import * as misskey from 'misskey-js'

import { timelineAtom } from '@/atoms'
import { stream, channel } from '@/core/connection'
import { apiGet } from '@/scripts/api'
import { Note, NoteUnion, RenoteUnion } from '@/types/Note'
import { toReactNode } from '../../services/MfmParse'
import { LayoutAnimation } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import parser from '../parser'

import { Parser } from '../parser'

const TIMELINE_NOTE_MAX_COUNT = 30

channel.on('note', note => {
  emit(parser.misskeyNoteToAppNote(note))
})

const emit = (note: Note) => {
  console.log(note)
}

// const FetchNotes = () => {
//   const [notes, setNotes] = useAtom(timelineAtom.note)
//   const [shouldGetNote, setShouldGetNote] = useAtom(timelineAtom.shoudGetNote)

//   useEffect(() => {
//     channel.on('note', note => {
//       if (!shouldGetNote) return
//       emit(note)
//     })

//     return () => {
//       channel.off('note')
//     }
//   }, [shouldGetNote])

//   const emit = useCallback((note: misskey.entities.Note) => {
//     const type = JudgementNoteType(note)

//     switch (type) {
//       case 'note': {
//         const text = toReactNode(note.text ? note.text : note.reply?.text ? note.reply.text : '')
//         const reactions = note.reactions ? convertReaction(note.reactions) : []

//         const newNote: NoteUnion = {
//           type: 'note',
//           ...note,
//           text,
//           reactions
//         }
//         addNotesToData([{ id: shortid.generate(), note: newNote }])
//         break
//       }
//       //renoteの場合、renoteの内容をnoteにコピーして、noteにあったデータをrenoteInfoに保存する
//       case 'renote': {
//         const text = toReactNode(note.renote?.text ? note.renote.text : '')

//         const reactions = note.renote!.reactions ? convertReaction(note.renote!.reactions) : []

//         const newNote: RenoteUnion = {
//           type: 'renote',
//           renoteInfo: { id: note.id, createdAt: note.createdAt, user: note.user },
//           ...note.renote!,
//           text,
//           reactions
//         }
//         addNotesToData([{ id: shortid.generate(), note: newNote }])
//         break
//       }
//     }
//   }, [])

//   const addNotesToData = useCallback((newData: Note[]) => {
//     LayoutAnimation.configureNext({
//       duration: 500,
//       update: { type: 'spring', springDamping: 1 }
//     })
//     setNotes(prevData => {
//       if (prevData.length > TIMELINE_NOTE_MAX_COUNT) {
//         prevData = prevData.slice(0, TIMELINE_NOTE_MAX_COUNT)
//       }
//       return [...newData, ...prevData]
//     })
//   }, [])

//   return <></>
// }

// export default FetchNotes

// const convertReaction = (reactions: misskey.entities.Note['reactions']): Note['note']['reactions'] => {
//   if (!reactions) return []
//   const parsedReactions: [string, number][] = Object.entries(reactions)
//   return parsedReactions.map(reaction => {
//     return { id: shortid.generate(), emoji: reaction[0], count: reaction[1], isContainsMe: false }
//   })
// }

// export const addReactionToNote = async (noteId: string, reaction: string) => {
//   apiGet('notes/reactions/create', { noteId, reaction }).catch(createError => {
//     switch (createError.code) {
//       case 'ALREADY_REACTED':
//         apiGet('notes/reactions/delete', { noteId, reaction }).catch(deleteError => {
//           console.log(deleteError)
//         })
//         break
//       default:
//         console.log(createError)
//         break
//     }
//   })
// }
