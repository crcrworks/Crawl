import React, { useState, useCallback, useEffect, useRef, useMemo, ReactNode } from 'react'
import { LayoutAnimation, RefreshControl, UIManager, StyleSheet, VirtualizedList, ViewToken } from 'react-native'
import { FlatList, View, Text, Spinner, Center } from 'native-base'
import * as misskey from 'misskey-js'
import { MotiView } from 'moti'
// import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomSheet from '@gorhom/bottom-sheet'
import shortid from 'shortid'

import AppearNote, { JudgementNoteType } from './timeline/note'
import ReactionScreen from '@/components/timeline/reaction'
import { toReactNode } from '@/backend/mfm-service'

import { apiGet } from '@/scripts/api'
import { ConvertEmoji } from '@/backend/emoji-service'
import { stream } from '@/stream'
import { localChannel } from '@/init'

const TIMELINE_NOTE_MAX_COUNT = 30

type Data = {
  id: string
  note: misskey.entities.Note
  textContent: any
  renoteTextContent: any
  isVisible: boolean
}

// const Stack = createStackNavigator()

const Timeline = () => {
  useEffect(() => {
    setData([])
    // handleEndReached(false)
    stream.on('noteUpdated', noteData => {
      console.log(noteData)
    })

    localChannel.on('note', note => {
      if (scrollY.current > 30) return
      const textContent = toReactNode(note.text ? note.text : note.reply?.text ? note.reply.text : '')
      const renoteTextContent = toReactNode(note.renote?.text ? note.renote.text : '')
      handleDataUpdate([{ id: shortid.generate(), note, textContent, renoteTextContent, isVisible: false }])
    })
  }, [])

  const [data, setData] = useState<Data[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEndReached, setIsEndReached] = useState(false)
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  const scrollY = useRef(0)

  const handleDataUpdate = useCallback(
    (newData: Data[]) => {
      LayoutAnimation.configureNext({
        duration: 500,
        update: { type: 'spring', springDamping: 1 }
      })
      setData(prevData => {
        if (prevData.length > TIMELINE_NOTE_MAX_COUNT) {
          prevData = prevData.slice(0, TIMELINE_NOTE_MAX_COUNT)
        }
        return [...newData, ...prevData]
      })
    },
    [setData]
  )

  const handleEndReached = useCallback(
    async (isDataClear: boolean) => {
      if (!isEndReached && !isLoading) {
        setIsLoading(true)

        await apiGet('notes/local-timeline', { limit: 50 })
          .then(notes => {
            setIsEndReached(notes.length === 0)
            const newData: Data[] = notes.map(note => {
              const noteType = JudgementNoteType(note)

              const textContent = toReactNode(note.text ? note.text : note.reply?.text ? note.reply.text : '')
              const renoteTextContent = toReactNode(note.renote?.text ? note.renote.text : '')

              return { id: shortid.generate(), note, textContent, renoteTextContent, isVisible: false }
            })

            if (isDataClear) setData([])
            handleDataUpdate(newData)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => {
            setIsLoading(false)
          })
      }
    },
    [data, isLoading, isEndReached, handleDataUpdate]
  )

  const doRefresh = () => {
    setIsEndReached(false)
    handleEndReached(true)
  }

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
    scrollY.current = contentOffset.y
  }

  //   const VirtualizedListWrapper = useCallback(() => {
  //     return (

  //     )
  //   }, [data])

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setData(prevData => {
        return prevData.map((item: Data) => {
          const isVisible = viewableItems.some(viewableItem => viewableItem.item === item)
          return { ...item, isVisible }
        })
      })
    },
    [data]
  )

  const renderItem = useCallback(({ item }: { item: Data }) => {
    return (
      <MotiView
        transition={{
          type: 'spring',
          damping: 15
        }}
        from={{ opacity: 0, scale: 0.8, translateY: -50 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
      >
        <AppearNote
          appearNote={item.note}
          setIsOpenBottomSheet={setIsOpenBottomSheet}
          textContent={item.textContent}
          renoteTextContent={item.renoteTextContent}
        />
      </MotiView>
    )
  }, [])

  return (
    <View flex={1}>
      {isOpenBottomSheet && <ReactionScreen isOpenBottomSheet={isOpenBottomSheet} setIsOpenBottomSheet={setIsOpenBottomSheet} />}
      <VirtualizedList
        keyExtractor={item => item.id}
        data={data}
        extraData={data.length}
        renderItem={renderItem}
        removeClippedSubviews={true}
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
