import { Center, Text, useColorModeValue } from 'native-base'

const MentionsScreen = () => {
  return (
    <Center safeArea _dark={{ bg: 'black.300' }} _light={{ bg: 'white.300' }} flex={1}>
      <Text color={useColorModeValue('blue.500', 'blue.300')}>Mentions</Text>
    </Center>
  )
}

export default MentionsScreen
