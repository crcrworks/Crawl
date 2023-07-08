import React, { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react'
import { StatusBar, View, Text, themeTools, useColorModeValue, useTheme, HStack, Button, Icon, Center, ScrollView, VStack } from 'native-base'
import { position, rgba } from 'polished'
import BottomSheet, { BottomSheetView, useBottomSheetInternal, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'
import { Octicons, AntDesign, Fontisto, Entypo, Feather } from '@expo/vector-icons'
import Animated, { useSharedValue, useValue } from 'react-native-reanimated'

type ReactionScreenProps = {
  isOpenBottomSheet: boolean
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
}

const ReactionScreen = (props: ReactionScreenProps) => {
  const { isOpenBottomSheet, setIsOpenBottomSheet } = props
  const sheetRef = useRef<BottomSheet>(null)
  const currentPosition = useSharedValue(0)
  const snapPoints = ['50%', '80%']
  const theme = useTheme()
  const color = {
    background: themeTools.getColor(theme, useColorModeValue('accent.100', 'accent.100'))
  }

  useEffect(() => {
    if (isOpenBottomSheet) {
      sheetRef.current?.expand()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
  }, [isOpenBottomSheet])

  return (
    <View flex={1} position="absolute" w="100%" h="100%" zIndex={100}>
      <BottomSheet
        ref={sheetRef}
        animatedPosition={currentPosition}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        onClose={() => setIsOpenBottomSheet(false)}
        backgroundStyle={{ backgroundColor: color.background, borderRadius: 40 }}
        handleIndicatorStyle={{ backgroundColor: 'white' }}
      >
        <BottomSheetView>
          <VStack mt={3}>
            <ActionButtons />

            <VStack mx={5} mt={5}>
              <HStack space={3}>
                <Text fontSize={40} bold={true}>
                  Reactions
                </Text>
                <View w={20} h={8} my="auto" bg={rgba('#000000', 0.2)} borderRadius={100}>
                  <Icon m="auto" as={Feather} name="search" color="white.100" />
                </View>
              </HStack>
              <ScrollView mt={1}>
                <View flexDirection="row">
                  <View px={5} py={1} borderRadius={100} borderWidth={1} borderColor="white.0">
                    <Text fontSize={15}>:Twitter:</Text>
                  </View>
                </View>
              </ScrollView>
            </VStack>
          </VStack>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

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
              console.log('a')
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

export default ReactionScreen
