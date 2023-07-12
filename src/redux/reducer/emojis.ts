import axios from 'axios'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { emojis: any } = { emojis: [] }

const emojisSlice = createSlice({
  name: 'emojis',
  initialState,
  reducers: {
    setEmojis: (state) => {
      // state.emojis = []
      // axios.get('https://misskey.io/api/emojis').then((res: any) => {
      //   console.log(res.data.emojis[0]["name"])
      //   state.emojis = res.data.emojis
      // }).catch(err => console.log(err))

    }
  }
})

export const { setEmojis } = emojisSlice.actions
export default emojisSlice.reducer
