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
import { toReactNode } from '@/core/services/MfmParse'

import { apiGet } from '@/scripts/api'
import { ConvertEmoji } from '@/core/services/EmojiParse'
import { stream } from '@/connection'
import { channel } from '@/connection'
import { Note, NoteUnion, RenoteUnion } from 'types/Note'
import { timelineAtom } from '@/atoms'
import { sendUpdateRequest } from '@/core/services/notes/update'

const Timeline = () => {
  const [notes, setNotes] = useAtom(timelineAtom.note)
  const [shouldGetNote, setShouldGetNote] = useAtom(timelineAtom.shoudGetNote)
  const [isLoading, setIsLoading] = useState(false)
  const [isEndReached, setIsEndReached] = useState(false)
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  useEffect(() => {
    setNotes([])
    // handleEndReached(false)
  }, [])

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

  const ListHeader = useCallback(() => {
    return (
      <View mt="70px">
        <SafeAreaView edges={['top']}>
          <Center>
            {/* <Text my={5} color={'white.0'} top={0}>
              上へスクロールして全てリロード
            </Text> */}
          </Center>
        </SafeAreaView>
      </View>
    )
  }, [])

  const ListFooter = useCallback(() => {
    return (
      <View mb="20px">
        <SafeAreaView edges={['bottom']}>
          <Center h="50px">{isLoading && <Spinner color="white.100" />}</Center>
        </SafeAreaView>
      </View>
    )
  }, [isLoading])

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent
    setShouldGetNote(contentOffset.y < 10 ? true : false)
  }

  const alreadySent = useRef<string[]>(null)
  const onViewableItemsChanged = useCallback(({ viewableItems, changed }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
    changed.map(item => {
      const data: Note = item.item
      const type = item.isViewable ? 'subNote' : 'unsubNote'

      if (!alreadySent.current?.includes(data.note.id)) {
        sendUpdateRequest(type, data.note.id)
      }

      if (item.isViewable) alreadySent.current?.push(data.note.id)
      else
        alreadySent.current?.filter(id => {
          id !== data.note.id
        })
    })
  }, [])

  const renderItem = useCallback(({ item }: { item: Note }) => {
    return (
      <MotiView
        from={{ opacity: 0, scale: 0.8, translateY: -50 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15
        }}
      >
        <AppearNote appearNote={item.note} setIsOpenBottomSheet={setIsOpenBottomSheet} />
      </MotiView>
    )
  }, [])

  return (
    <View flex={1}>
      {isOpenBottomSheet && <ReactionScreen isOpenBottomSheet={isOpenBottomSheet} setIsOpenBottomSheet={setIsOpenBottomSheet} />}
      <VirtualizedList
        keyExtractor={item => item.id}
        data={notes}
        extraData={notes.length}
        renderItem={renderItem}
        removeClippedSubviews={false}
        getItem={(item, index) => item[index]}
        getItemCount={item => item.length}
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
      />
    </View>
  )
}

export default Timeline
