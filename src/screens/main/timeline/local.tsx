import * as React from 'react'
import { Text, Box, Center, VStack } from 'native-base'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import ThemeToggle from '../../../components/theme-toggle'

const LocalScreen = () => {
  return (
    <Center
      _dark={{ bg: 'dark.300' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Box></Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

export default LocalScreen
