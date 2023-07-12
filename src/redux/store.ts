import { configureStore } from '@reduxjs/toolkit'
import timelineReducer from './reducer/timeline'
import emojisReducer from './reducer/emojis'

const store = configureStore({
  reducer: {
    timeline: timelineReducer,
    emojis: emojisReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch

export default store
