//libraries
import { MotiView } from 'moti'
import React from 'react'

//types
import { Note } from '@/types/entities/Note'
import { ProfileScreenNavigationProp } from '@/types/ProfileNavigation'

//components
import AppearNote from '@/components/shared/note/index'

type RenderItemProps = {
  item: Note
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  navigation: ProfileScreenNavigationProp
}

const RenderItem = (props: RenderItemProps) => {
  const { item, setIsOpenBottomSheet, navigation } = props
  const note = item
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'timing',
        duration: 500
      }}
    >
      <AppearNote
        appearNote={note}
        setIsOpenBottomSheet={setIsOpenBottomSheet}
        navigation={navigation}
      />
    </MotiView>
  )
}

export default RenderItem
