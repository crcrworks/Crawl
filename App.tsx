import React from 'react'
import AppContainer from './src/components/app-container'
import Navigator from './src/'
import { LogBox } from 'react-native'

export default function App() {
  LogBox.ignoreLogs(['Sending'])
  return (
    <AppContainer>
      <Navigator />
    </AppContainer>
  )
}
