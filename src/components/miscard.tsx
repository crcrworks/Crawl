import { User, UserDetailed } from '@/types/entities/User'
import { Avatar, Center, HStack, Text, VStack, View } from 'native-base'
import { rgba } from 'polished'
import { useState } from 'react'
import Animated, { SensorType, useAnimatedSensor, useAnimatedStyle, withTiming } from 'react-native-reanimated'

type UserCardProps = {
  w: string
  h: string
  userId: User['id']
}

const Miscard = (props: UserCardProps) => {
  const { w, h, userId } = props
  const [userData, setUserData] = useState<UserDetailed>()

  // useEffect(() => {
  //   apiGet('users/show', { userId }).then(res => {
  //     setUserData(res)
  //   })
  // }, [userId])

  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, { interval: 100 })
  const style = useAnimatedStyle(() => {
    const value = animatedSensor.sensor.value
    const times = 10
    const duration = 200
    return {
      transform: [
        {
          rotateX: withTiming(`${value.qx * -times}deg`, { duration })
        },
        {
          rotateY: withTiming(`${value.qy * -times}deg`, { duration })
        },
        {
          rotateZ: withTiming(`${value.qz * -times}deg`, { duration })
        }
      ]
    }
  })

  return (
    <Animated.View style={[style]}>
      <View w="95%" m={2} bg="white.100" borderRadius={10} overflow="hidden" style={{ aspectRatio: 16 / 9 }}>
        {userData && (
          <VStack flex={1}>
            <HStack h="60px" zIndex={2}>
              <Avatar mt={5} ml={3} source={{ uri: userData.avatarUrl }} size="55px" zIndex={2} />
              <Text top={6} ml={2} color="black.100" fontSize={25} bold={true}>
                {userData.name}
              </Text>
              <Text top={9} ml={2} color="black.100" fontSize={12} bold={true}>
                {`@${userData.username}`}
              </Text>
              <Center h={5} mt={2} ml="auto" mr={2} px={3} right={0} bg="accent.100" borderRadius={100}>
                <Text>misskey.io</Text>
              </Center>
            </HStack>
            <HStack h={5} bg="accent.100"></HStack>
            <VStack flex={1} px={3} bg="accent.100" zIndex={1}>
              <View maxH={100}>
                <Text color="white.300">{userData.description}</Text>
              </View>
              <HStack position="absolute" bottom={0} m={2}>
                <HStack px={8} py={1} bg={rgba('black', 0.2)} borderRadius={100} space={2}>
                  <Center>
                    <Text h={6} top="1px" fontSize={20} bold={true}>
                      {userData.notesCount}
                    </Text>
                    <Text top="-2px" fontSize={10}>
                      Notes
                    </Text>
                  </Center>
                  <View w="1px" h="20px" my="auto" bg="white.0" />
                  <Center>
                    <Text h={6} top="1px" fontSize={20} bold={true}>
                      {/* {userData.followersCount} */}
                    </Text>
                    <Text top="-2px" fontSize={10}>
                      Followers
                    </Text>
                  </Center>
                  <View w="1px" h="20px" my="auto" bg="white.0" />
                  <Center>
                    <Text h={6} top="1px" fontSize={20} bold={true}>
                      {userData.followingCount}
                    </Text>
                    <Text top="-2px" fontSize={10}>
                      Following
                    </Text>
                  </Center>
                </HStack>
              </HStack>
            </VStack>
          </VStack>
        )}
      </View>
    </Animated.View>
  )
}

export default Miscard
