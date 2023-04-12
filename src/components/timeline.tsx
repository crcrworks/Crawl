import React, { useState, useCallback, useEffect, useRef, useMemo, ReactNode } from 'react'
import { LayoutAnimation, RefreshControl, UIManager, StyleSheet, VirtualizedList, ViewToken } from 'react-native'
import { FlatList, View, Text, Spinner, Center } from 'native-base'
import * as misskey from 'misskey-js'
import { MotiView } from 'moti'
// import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomSheet from '@gorhom/bottom-sheet'
import shortid from 'shortid'
import { useAtom } from 'jotai'

import AppearNote from './timeline/note'
import ReactionScreen from '@/components/timeline/reaction'

import { apiGet } from '@/scripts/api'
import parseEmojiCodeToEmoji from '@/models/entities/emojiCode-to-emoji'
import { stream } from '@/core/connection'
import { channel } from '@/core/connection'
import { Note, NoteUnion, RenoteUnion } from '@/types/Note'
import { timelineAtom } from '@/atoms'
// import { sendUpdateRequest } from '@/models/note/update'
import { useDispatch, useSelector } from 'react-redux'
import { addNote, toggleAutoFetch } from '@/redux/reducer/timeline'
import { RootState, RootDispatch } from '@/redux/store'
import NoteParser from '@/models/entities/note-parser'
const SHOULD_GET_NOTE_AMOUNT = 10

const Timeline = () => {
  const dispatch = useDispatch()
  const { notes } = useSelector((state: RootState) => state.timeline)

  const [isLoading, setIsLoading] = useState(false)
  const [isEndReached, setIsEndReached] = useState(false)
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  // useEffect(() => {
  //   setNotes([])
  //   // handleEndReached(false)
  // }, [])

  // const handleEndReached = useCallback(
  //   async (isDataClear: boolean) => {
  //     if (!isEndReached && !isLoading) {
  //       setIsLoading(true)

  //       await apiGet('notes/local-timeline', { limit: 50 })
  //         .then(notes => {
  //           setIsEndReached(notes.length === 0)
  //           const newData: Data[] = notes.map(note => {
  //             const noteType = JudgementNoteType(note)

  //             const textContent = toReactNode(note.text ? note.text : note.reply?.text ? note.reply.text : '')
  //             const renoteTextContent = toReactNode(note.renote?.text ? note.renote.text : '')

  //             return { id: shortid.generate(), note: { type: 'note', ...note,  }, textContent, renoteTextContent, isVisible: false }
  //           })

  //           if (isDataClear) setData([])
  //           handleDataUpdate(newData)
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         })
  //         .finally(() => {
  //           setIsLoading(false)
  //         })
  //     }
  //   },
  //   [data, isLoading, isEndReached, handleDataUpdate]
  // )

  // const doRefresh = () => {
  //   setIsEndReached(false)
  //   handleEndReached(true)
  // }

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
      <View mt="10px">
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
        from={{ opacity: 0, scale: 0.8, translateY: -50 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15
        }}
      >
        <AppearNote appearNote={note} setIsOpenBottomSheet={setIsOpenBottomSheet} />
      </MotiView>
    )
  }, [])

  return (
    <View flex={1}>
      {isOpenBottomSheet && <ReactionScreen isOpenBottomSheet={isOpenBottomSheet} setIsOpenBottomSheet={setIsOpenBottomSheet} />}
      <VirtualizedList
        keyExtractor={note => (note.type === 'note' ? note.id : note.renoterInfo.id)}
        data={notes}
        extraData={notes.length}
        renderItem={renderItem}
        removeClippedSubviews={false}
        getItem={(note, index) => note[index]}
        getItemCount={note => note.length}
        // refreshing={isLoading}
        // onRefresh={doRefresh}
        // refreshControl={<RefreshControl progressViewOffset={120} refreshing={isLoading} onRefresh={doRefresh} tintColor={'white'} size={10} />}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        onScroll={handleScroll}
        // onEndReachedThreshold={0.1}
        // onEndReached={() => handleEndReached(false)}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Timeline
