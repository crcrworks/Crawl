import React, { useEffect } from 'react'
import AppContainer from './src/components/app-container'
import Navigator from './src/'
import { LogBox } from 'react-native'

import { init } from '@/init'

const App = () => {
  useEffect(() => {
    init()
  })
  LogBox.ignoreLogs(['Sending'])
  return (
    <AppContainer>
      <Navigator />
    </AppContainer>
  )
}

export default App
