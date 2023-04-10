import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Note } from '@/types/Note'
import { channel } from '@/core/connection'

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await fetch('https://misskey.io/notes')
  const notes = await response.json()
  return notes
})

const initialState: { notes: Note[] } = { notes: [] }

const timelineSlice = createSlice({
  name: 'timeline',
  initialState: initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotes.pending, state => {})
      .addCase(fetchNotes.fulfilled, (state, action) => {})
      .addCase(fetchNotes.rejected, state => {})
  }
})
export const { addNote } = timelineSlice.actions
export default timelineSlice.reducer
