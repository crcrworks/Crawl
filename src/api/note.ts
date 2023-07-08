import { channel } from '@/core/connection'
import store from '@/redux/store'
import { apiGet } from '@/scripts/api'

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
    .then(notes => {
      const parsedNotes: Note[] = notes.map(note => new NoteParser(note).parsedNote())

      LayoutAnimation.configureNext({
        duration: 500,
        update: { type: 'spring', springDamping: 1 }
      })

      store.dispatch(addNote(parsedNotes))
    })
    .finally(() => {
      store.dispatch(toggleIsLoading(false))
    })
    .catch(err => {
      console.log(err)
    })
}
