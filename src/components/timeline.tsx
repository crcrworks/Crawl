import { MotiView } from 'moti'
import { Center, View } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ViewToken, VirtualizedList } from 'react-native'
// import { createStackNavigator } from '@react-navigation/stack'
import { createStackNavigator } from '@react-navigation/stack'

import ReactionScreen from '@/components/timeline/reaction'
import AppearNote from './timeline/note'

import { stream } from '@/core/connection'
import { Note } from '@/types/entities/Note'
// import { sendUpdateRequest } from '@/models/note/update'
import { getNotes } from '@/api/note'
import { clearNotes, toggleAutoFetch, toggleIsLoading } from '@/redux/reducer/timeline'
import { RootState } from '@/redux/store'
import { ProfileScreenNavigationProp } from '@/types/ProfileNavigation'
import { useDispatch, useSelector } from 'react-redux'

const SHOULD_GET_NOTE_AMOUNT = 10

const stack = createStackNavigator()

const AUTO_LOAD = false

const Timeline = ({ navigation }: { navigation: ProfileScreenNavigationProp }) => {
  const dispatch = useDispatch()
  const { notes, isLoading } = useSelector((state: RootState) => state.timeline)

  // const [isLoading, setIsLoading] = useState(false)
  const [isEndReached, setIsEndReached] = useState(false)
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  useEffect(() => {
    dispatch(clearNotes())
    handleEndReached()
  }, [])

  const handleEndReached = useCallback(async () => {
    if (!isLoading) {
      dispatch(toggleIsLoading(true))
      await getNotes(10)
    }
  }, [notes, isEndReached, isLoading])

  const doRefresh = () => {
    // setIsEndReached(false)
    handleEndReached()
  }

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent
    dispatch(toggleAutoFetch(contentOffset.y < 20))
  }

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
    changed.map(item => {
      const note: Note = item.item
      if (item.isViewable) {
        stream.send('subNote', { id: note.id })
      } else {
        stream.send('unsubNote', { id: note.id })
      }
    })
    // changed.map(item => {
    //   const data: Note = item.item
    //   const type = item.isViewable ? 'subNote' : 'unsubNote'
    //   if (!alreadySent.current?.includes(data.note.id)) {
    //     sendUpdateRequest(type, data.note.id)
    //   }
    //   if (item.isViewable) alreadySent.current?.push(data.note.id)
    //   else
    //     alreadySent.current?.filter(id => {
    //       id !== data.note.id
    //     })
    // })
  }, [])

  const ListHeader = useCallback(() => {
    return (
      <View mt="20px">
        <Center>
          {/* <Text my={5} color={'white.0'} top={0}>
              上へスクロールして全てリロード
            </Text> */}
        </Center>
      </View>
    )
  }, [])

  const ListFooter = useCallback(() => {
    return <View mb="10px"></View>
  }, [isLoading])

  const renderItem = useCallback(({ item }: { item: Note }) => {
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
        <AppearNote appearNote={note} setIsOpenBottomSheet={setIsOpenBottomSheet} navigation={navigation} />
      </MotiView>
    )
  }, [])

  return (
    <View flex={1} bg="black.300">
      {isOpenBottomSheet && <ReactionScreen isOpenBottomSheet={isOpenBottomSheet} setIsOpenBottomSheet={setIsOpenBottomSheet} />}
      <VirtualizedList
        keyExtractor={note => (note.type === 'note' ? note.id : note.renoterInfo.id)}
        data={notes}
        extraData={notes.length}
        renderItem={renderItem}
        removeClippedSubviews={true}
        getItem={(note, index) => note[index]}
        getItemCount={note => note.length}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        onScroll={handleScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        onEndReached={() => handleEndReached()}
        refreshing={isLoading}
        onRefresh={doRefresh}
        refreshControl={<RefreshControl progressViewOffset={0} refreshing={isLoading} onRefresh={doRefresh} tintColor={'white'} size={10} />}
      />
    </View>
  )
}

export default Timeline
