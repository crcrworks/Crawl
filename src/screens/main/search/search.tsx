import React from 'react'
import { Center, Box, Text, useColorModeValue } from 'native-base'

const SearchScreen = () => {
  return (
    <Center
      safeArea
      _dark={{ bg: 'primary.200' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <Text color={useColorModeValue('blue.500', 'blue.300')}>All</Text>
    </Center>
  )
}

export default SearchScreen
