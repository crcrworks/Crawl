import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducer/note'

const store = configureStore({
  reducer: {
    note: noteReducer
  }
})

export default store
