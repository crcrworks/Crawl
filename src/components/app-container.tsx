import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import theme from 'crawl/src/theme'

interface Props {
  children: React.ReactNode
}

function AppContainer(props: Props) {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default AppContainer
