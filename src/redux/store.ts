import { configureStore } from '@reduxjs/toolkit'
import timelineReducer from './reducer/timeline'

const store = configureStore({
  reducer: {
    timeline: timelineReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch

export default store
