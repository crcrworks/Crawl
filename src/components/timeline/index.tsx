//libraries
import { View } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, ViewToken, VirtualizedList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

//types
import { RootState } from '@/redux/store'
import { ProfileScreenNavigationProp } from '@/types/ProfileNavigation'
import { Note } from '@/types/entities/Note'

//components
import ReactionScreen from '../shared/reaction'
import ListFooter from './footer'
import ListHeader from './header'
import RenderItems from './render-items'

import { getNotes } from '@/api/note'
import { stream } from '@/core/connection'
import { clearNotes, toggleAutoFetch, toggleIsLoading } from '@/redux/reducer/timeline'

const Timeline = ({ navigation }: { navigation: ProfileScreenNavigationProp }) => {
  const dispatch = useDispatch()
  const { notes, isLoading } = useSelector((state: RootState) => state.timeline)

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
    //setIsEndReached(false)
    handleEndReached()
  }

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent
    dispatch(toggleAutoFetch(contentOffset.y < 20))
  }

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems, changed }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      changed.map(item => {
        const note: Note = item.item
        if (item.isViewable) {
          stream.send('subNote', { id: note.id })
        } else {
          stream.send('unsubNote', { id: note.id })
        }
      })
    },
    []
  )

  return (
    <View flex={1} bg="black.300">
      {isOpenBottomSheet && (
        <ReactionScreen
          isOpenBottomSheet={isOpenBottomSheet}
          setIsOpenBottomSheet={setIsOpenBottomSheet}
        />
      )}
      <VirtualizedList
        keyExtractor={note => (note.type === 'note' ? note.id : note.renoterInfo.id)}
        data={notes}
        extraData={notes.length}
        renderItem={({ item }: { item: Note }) => (
          <RenderItems
            item={item}
            setIsOpenBottomSheet={setIsOpenBottomSheet}
            navigation={navigation}
          />
        )}
        getItem={(note, index) => note[index]}
        getItemCount={note => note.length}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        onScroll={handleScroll}
        onViewableItemsChanged={handleViewableItemsChanged}
        onEndReached={() => handleEndReached()}
        refreshing={isLoading}
        onRefresh={doRefresh}
        refreshControl={
          <RefreshControl
            progressViewOffset={0}
            refreshing={isLoading}
            onRefresh={doRefresh}
            tintColor={'white'}
            size={10}
          />
        }
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
      />
    </View>
  )
}

export default Timeline
