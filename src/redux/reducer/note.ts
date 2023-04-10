import { createSlice } from '@reduxjs/toolkit'

import { Note } from '@/types/Note'

const initialState: Note[] = []

const addNoteReducer = (state: Note[]) => {}

const deleteNoteReducer = (state: Note[]) => {}

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: addNoteReducer,
    deleteNote: deleteNoteReducer
  }
})
export const { addNote, deleteNote } = noteSlice.actions
export default noteSlice.reducer

// interface NoteState {
//   notes: string[]
// }

// const initialState: NoteState = {
//   notes: []
// }

// const noteSlice = createSlice({
//   name: 'note',
//   initialState,
//   reducers: {
//     add: (state, action: PayloadAction<string>) => {
//       state.notes.push(action.payload)
//     },
//     delete: (state, action: PayloadAction<number>) => {
//       state.notes.splice(action.payload, 1)
//     }
//   }
// })

// type RootState = ReturnType<typeof noteSlice.reducer>
// const store = configureStore({ reducer: noteSlice.reducer })
