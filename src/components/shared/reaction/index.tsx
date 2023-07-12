//libraries
import { Feather } from '@expo/vector-icons'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import * as Haptics from 'expo-haptics'
import {
  HStack,
  Icon,
  Text,
  VStack,
  View,
  themeTools,
  useColorModeValue,
  useTheme
} from 'native-base'
import { rgba } from 'polished'
import { useEffect, useRef } from 'react'
import { useSharedValue } from 'react-native-reanimated'

//components
import ActionButtons from './action-buttons'
import Emojis from './emojis'

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
              <Emojis />
            </VStack>
          </VStack>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default ReactionScreen
