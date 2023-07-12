import { View, Center, HStack, Button, Icon } from 'native-base'
import { position, rgba } from 'polished'
import { Octicons, AntDesign, Fontisto, Entypo, Feather } from '@expo/vector-icons'

const ActionButtons = () => {
  return (
    <View mx={5} borderRadius={40}>
      <Center>
        <HStack space={2}>
          <Button
            w="60px"
            h="60px"
            variant="unstyled"
            bg={rgba('#000000', 0.2)}
            borderRadius={10}
            onPress={() => {
              console.log('pushed')
            }}
            leftIcon={<Icon as={Octicons} name="reply" size={5} color="white.100" />}
          />

          <Button
            w="60px"
            h="60px"
            bg={rgba('#000000', 0.2)}
            variant="unstyled"
            borderRadius={10}
            onPress={() => {
              console.log('a')
            }}
            leftIcon={<Icon as={AntDesign} name="retweet" size={5} color="white.100" />}
          />

          <Button
            w="60px"
            h="60px"
            bg={rgba('#000000', 0.2)}
            variant="unstyled"
            borderRadius={10}
            onPress={() => {
              console.log('a')
            }}
            leftIcon={<Icon as={Fontisto} name="favorite" size={5} left="4px" color="white.100" />}
          />
          <Button
            w="60px"
            h="60px"
            bg={rgba('#000000', 0.2)}
            variant="unstyled"
            borderRadius={10}
            onPress={() => {
              console.log('a')
            }}
            leftIcon={<Icon as={Octicons} name="share" size={5} left="3px" color="white.100" />}
          />
          <Button
            w="30px"
            h="30px"
            ml={5}
            my="auto"
            bg={rgba('#000000', 0.2)}
            variant="unstyled"
            borderRadius={100}
            onPress={() => {
              console.log('a')
            }}
            leftIcon={<Icon as={Entypo} name="dots-three-horizontal" color="white.100" />}
          />
        </HStack>
      </Center>
    </View>
  )
}

export default ActionButtons
