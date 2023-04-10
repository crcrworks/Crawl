import * as React from 'react'
import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import theme from '@/core/theme'
import ServicesConteiner from '@/models/note/services-container'

type AppContainerProps = {
  children: React.ReactNode
}

const AppContainer = (props: AppContainerProps) => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NativeBaseProvider theme={theme}>
          <ServicesConteiner />
          {props.children}
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default AppContainer
