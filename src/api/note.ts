import { channel } from '@/core/connection'
import store from '@/redux/store'
import { apiGet } from '@/scripts/api'
import axios from 'axios'

import NoteParser from '@/models/entities/note-parser'
import { addNote, toggleIsLoading } from '@/redux/reducer/timeline'
import { Note } from '@/types/entities/Note'
import { LayoutAnimation } from 'react-native'

channel.on('note', note => {
  // const noteParser = new NoteParser(note)
  // const parsedNote = noteParser.parsedNote()
  // if (!parsedNote) return
  // if (store.getState().timeline.isAutoFetch) store.dispatch(addNote(parsedNote))
})

export const getNotes = async (limit: number) => {
  await apiGet('notes/local-timeline', { limit })
    .then(async notes => {
      LayoutAnimation.configureNext({
        duration: 500,
        update: { type: 'spring', springDamping: 1 }
      })

      await axios.get('https://misskey.io/api/emojis').then(res => {
        const parsedNotes: Note[] = notes.map(note => new NoteParser(note).parsedNote())
        const newNotes: Note[] = parsedNotes.map(note => {
          const updatedReactions = note.reactions.map(reaction => {
            const emoji = res.data.emojis.find((e: any) => e.name === reaction.code)
            return emoji ? { ...reaction, url: emoji.url } : reaction
          })
          return note.reactions ? { ...note, reactions: updatedReactions } : note
        })

        store.dispatch(addNote(newNotes))
      })
    })
    .finally(() => {
      store.dispatch(toggleIsLoading(false))
    })
    .catch(err => {
      console.log(err)
    })
}
