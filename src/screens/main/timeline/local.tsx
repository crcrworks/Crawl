import * as React from 'react'
import { Text, Box, Center, VStack } from 'native-base'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import ThemeToggle from '../../../components/theme-toggle'
import AccountIcon from '../../../components/accountIcon'

const LocalScreen = () => {
  return (
    <Center
      _dark={{ bg: 'primary.200' }}
      _light={{ bg: 'blueGray.50' }}
      px={4}
      flex={1}
    >
      <VStack space={5} alignItems="center">
        <Box>
          <Text>Hello</Text>
          <AccountIcon />
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}

export default LocalScreen
