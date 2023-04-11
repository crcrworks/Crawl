import { stream, channel } from '@/core/connection'
import store from '@/redux/store'

import { addNote, removeReaction } from '@/redux/reducer/timeline'
import NoteParser from '../../entities/note-parser'
import { apiGet } from '@/scripts/api'

channel.on('note', note => {
  const noteParser = new NoteParser(note)
  const parsedNote = noteParser.parsedNote()
  if (!parsedNote) return
  if (store.getState().timeline.isAutoFetch) store.dispatch(addNote(parsedNote))
})

export const sendReaction = async (noteId: string, reaction: string) => {
  apiGet('notes/reactions/create', { noteId, reaction }).catch(createError => {
    switch (createError.code) {
      case 'ALREADY_REACTED':
        apiGet('notes/reactions/delete', { noteId, reaction })
          .then(deleteData => {})
          .catch(deleteError => {
            console.log(deleteError)
          })
        break
      default:
        console.log(createError)
        break
    }
  })
}
