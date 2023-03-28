import React, { useEffect, useRef } from 'react'
import { Center, Box, Text, useColorModeValue } from 'native-base'
import Lottie from 'lottie-react-native'
import { Animated, Easing } from 'react-native'

const GlocalScreen = () => {
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
      _dark={{ bg: 'primary.200' }}
      _light={{ bg: 'blueGray.50' }}
      flex={1}
    >
      <Text color={useColorModeValue('blue.500', 'blue.300')}>Global</Text>
      <Lottie
        source={require('../../../../assets/animations/tabbar.json')}
        progress={animationProgress.current}
      />
    </Center>
  )
}

export default GlocalScreen
