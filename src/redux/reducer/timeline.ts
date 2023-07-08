import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Note, Reaction } from '@/types/entities/Note'

// export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
//   const response = await fetch('https://misskey.io/notes')
//   const notes = await response.json()
//   return notes
// })

const initialState: { notes: Note[]; isAutoFetch: boolean; isLoading: boolean } = { notes: [], isAutoFetch: true, isLoading: false }

const timelineSlice = createSlice({
  name: 'timeline',
  initialState: initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note[]>) => {
      action.payload.map(note => {
        if (state.notes.findIndex(item => item.id === note.id) === -1) {
          state.notes.unshift(note)
        }
      })

      if (state.notes.length > 20) {
        state.notes.splice(20, state.notes.length - 20)
      }
    },
    clearNotes: state => {
      state.notes = []
    },
    toggleAutoFetch: (state, action: PayloadAction<boolean>) => {
      state.isAutoFetch = action.payload
    },
    toggleIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    addReaction: (state, action: PayloadAction<{ reaction: Omit<Reaction, 'count'>; noteId: string }>) => {
      const noteIndex = state.notes.findIndex(item => item.id === action.payload.noteId)
      const targetNote = state.notes[noteIndex]
      if (noteIndex === -1) return
      const reactionIndex = state.notes[noteIndex].reactions.findIndex(item => item.emoji === action.payload.reaction.emoji)
      const targetReaction = state.notes[noteIndex].reactions[reactionIndex]

      if (reactionIndex !== -1) {
        state.notes[noteIndex].reactions[reactionIndex].count += 1
        if (targetReaction.isContainsMe === false && action.payload.reaction.isContainsMe === true)
          state.notes[noteIndex].reactions[reactionIndex].isContainsMe = true
      } else {
        state.notes[noteIndex].reactions.push({ ...action.payload.reaction, count: 1 })
      }
    },
    removeReaction: (state, action: PayloadAction<{ noteId: string }>) => {}
  },
  extraReducers: builder => {
    // builder
    //   .addCase(fetchNotes.pending, state => {})
    //   .addCase(fetchNotes.fulfilled, (state, action) => {})
    //   .addCase(fetchNotes.rejected, state => {})
  }
})
export const { addNote, toggleAutoFetch, addReaction, removeReaction, toggleIsLoading, clearNotes } = timelineSlice.actions
export default timelineSlice.reducer
