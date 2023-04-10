import React, { useEffect } from 'react'
import AppContainer from './src/components/app-container'
import Navigator from './src/app'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'

import { init } from '@/core/init'
import store from '@/redux/store'

const App = () => {
  useEffect(() => {
    init()
  }, [])
  LogBox.ignoreLogs(['Sending'])
  return (
    <AppContainer>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </AppContainer>
  )
}

export default App
