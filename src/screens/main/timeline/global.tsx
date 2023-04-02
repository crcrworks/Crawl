import React, { useEffect, useRef } from 'react'
import { Center, Box, Text, useColorModeValue, Image } from 'native-base'
import Lottie from 'lottie-react-native'
import { Animated, Easing } from 'react-native'

function GlocalScreen() {
  const animationProgress = useRef(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start()
  }, [])

  return (
    <Center
      safeArea
      _dark={{ bg: 'black.300' }}
      _light={{ bg: 'white.300' }}
      flex={1}
    >
      <Text color={useColorModeValue('blue.500', 'blue.300')}>Global</Text>
      <Image
        source={{ uri: 'https://placehold.jp/150x150.png' }}
        width={100}
        height={100}
        alt="image"
      />
    </Center>
  )
}

export default GlocalScreen
