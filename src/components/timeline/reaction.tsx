import React, { useRef, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react'
import { StatusBar, View, Text } from 'native-base'
import { position } from 'polished'
import BottomSheet, { BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'

type ReactionScreenProps = {
  isOpenBottomSheet: boolean
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
}

const ReactionScreen = (props: ReactionScreenProps) => {
  const { isOpenBottomSheet, setIsOpenBottomSheet } = props

  const sheetRef = useRef<BottomSheet>(null)

  useEffect(() => {
    if (isOpenBottomSheet) {
      sheetRef.current?.expand()
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
  }, [isOpenBottomSheet])

  const snapPoints = ['50%', '80%']

  return (
    <View flex={1} position="absolute" w="100%" h="100%" zIndex={100}>
      <BottomSheet ref={sheetRef} snapPoints={snapPoints} enablePanDownToClose={true} onClose={() => setIsOpenBottomSheet(false)}>
        <BottomSheetView>
          <Text>hello</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  )
}

export default ReactionScreen
