import React, { useEffect, useRef } from 'react'
import { Center, Box, Text, useColorModeValue, Image, View } from 'native-base'
import Lottie from 'lottie-react-native'
import { Animated, Easing } from 'react-native'
import * as mfm from 'mfm-js'

import shortid from 'shortid'

import parseEmojiCodeToEmoji from '@/models/entities/emojiCode-to-emoji'
import { ReactNode } from 'react'

const GlobalScreen = () => {
  const animationProgress = useRef(new Animated.Value(0))
  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start()
  }, [])

  const node: ReactNode = <Text>Twitter:igyo:</Text>
  const emoji = parseEmojiCodeToEmoji(node)

  return (
    <Center safeArea _dark={{ bg: 'black.300' }} _light={{ bg: 'white.300' }} flex={1}>
      <Text color={useColorModeValue('blue.500', 'blue.300')}>Global</Text>
      <Image source={{ uri: 'https://placehold.jp/150x150.png' }} width={100} height={100} alt="image" />
      {emoji}
    </Center>
  )
}

export default GlobalScreen
