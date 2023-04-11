import React, { useEffect } from 'react'
import AppContainer from './src/components/app-container'
import Navigator from './src/components'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'

import '@/core/index'
import store from '@/redux/store'

const App = () => {
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
