import { Center, Text, useColorModeValue } from 'native-base'

const AllScreen = () => {
  return (
    <Center safeArea _dark={{ bg: 'black.300' }} _light={{ bg: 'white.300' }} flex={1}>
      <Text color={useColorModeValue('blue.500', 'blue.300')}>All</Text>
    </Center>
  )
}

export default AllScreen
