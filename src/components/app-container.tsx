import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import theme from '@/theme'

type AppContainerProps = {
  children: React.ReactNode
}

const AppContainer = (props: AppContainerProps) => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>{props.children}</NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default AppContainer
