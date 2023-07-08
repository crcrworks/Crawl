import { channel } from '@/core/connection'
import store from '@/redux/store'
import { apiGet } from '@/scripts/api'
import shortid from 'shortid'

import NoteParser from '@/models/entities/note-parser'
import { addNote, addReaction, toggleIsLoading } from '@/redux/reducer/timeline'
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
    .finally(() => store.dispatch(toggleIsLoading(false)))
    .catch(error => {
      console.log(error)
    })
  // const parsedNotes: Note[] = notes.map(note => new NoteParser(note).parsedNote())

  // store.dispatch(addNote(parsedNotes))
}

export const sendReaction = async (noteId: string, reaction: string) => {
  store.dispatch(
    addReaction({
      reaction: {
        id: shortid.generate(),
        emoji: reaction,
        isContainsMe: true
      },
      noteId
    })
  )

  /* apiGet('notes/reactions/create', { noteId, reaction }) */
  /*   .then(res => { */
  /*     console.log(res) */
  /*   }) */
  /*   .catch(err => { */
  /*     console.log(err) */
  /*   }) */
  /* .catch(createError => { */
  /*   switch (createError.code) { */
  /*     case 'ALREADY_REACTED': */
  /*       apiGet('notes/reactions/delete', { noteId, reaction }) */
  /*         .then(deleteData => {}) */
  /*         .catch(deleteError => { */
  /*           console.log(deleteError) */
  /*         }) */
  /*       break */
  /*     default: */
  /*       console.log(createError) */
  /*       break */
  /*   } */
  /* }) */
}
