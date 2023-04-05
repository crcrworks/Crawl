import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { LayoutAnimation, RefreshControl, UIManager, StyleSheet, VirtualizedList } from 'react-native'
import { FlatList, View, Text, Spinner, Center } from 'native-base'
import * as misskey from 'misskey-js'
import { MotiView } from 'moti'
// import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import BottomSheet from '@gorhom/bottom-sheet'

import { useAtom } from 'jotai'
import { OpenReactionScreenAtom } from '@/atoms/atoms'

import { apiGet } from '@/scripts/api'
import shortid from 'shortid'
import AppearNote from './timeline/note'

import ReactionScreen from '@/components/timeline/reaction'

type Data = {
  id: string
  note: misskey.entities.Note
}

// const Stack = createStackNavigator()

function Timeline() {
  useEffect(() => {
    handleEndReached(false)
  }, [])

  const [openReactionScreen, setOpenReactionScreen] = useAtom(OpenReactionScreenAtom)

  useEffect(() => {
    //  data.map(item => {
    //     if(item.note.id === )
    //  })
  }, [openReactionScreen])

  const [data, setData] = useState<Data[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEndReached, setIsEndReached] = useState(false)

  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  const handleDataUpdate = useCallback(
    (newData: Data[]) => {
      LayoutAnimation.easeInEaseOut()
      setData(prevData => {
        return [...prevData, ...newData]
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
            const newData: Data[] = notes.map(note => ({ id: shortid.generate(), isFloat: false, note }))

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

  const renderItem = useCallback(({ item }: { item: Data }) => {
    return <AppearNote appearNote={item.note} setIsOpenBottomSheet={setIsOpenBottomSheet} />
  }, [])

  const doRefresh = () => {
    setIsEndReached(false)
    handleEndReached(true)
  }

  const ListHeader = useCallback(() => {
    return (
      <View mt="60px">
        <SafeAreaView edges={['top']}>
          <Center>
            <Text my={5} color={'white.0'} top={0}>
              上へスクロールして全てリロード
            </Text>
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

  const scrollY = useRef(0)
  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent
    scrollY.current = contentOffset.y
  }

  const reactionScreenRef = useRef()

  //   const VirtualizedListWrapper = useCallback(() => {
  //     return (

  //     )
  //   }, [data])

  return (
    <View flex={1}>
      {isOpenBottomSheet && <ReactionScreen isOpenBottomSheet={isOpenBottomSheet} setIsOpenBottomSheet={setIsOpenBottomSheet} />}
      <VirtualizedList
        keyExtractor={item => item.id}
        data={data}
        extraData={data.length}
        renderItem={renderItem}
        onEndReachedThreshold={0.1}
        onEndReached={() => handleEndReached(false)}
        removeClippedSubviews={true}
        getItem={(item, index) => item[index]}
        getItemCount={item => item.length}
        onScroll={handleScroll}
        refreshing={isLoading}
        onRefresh={doRefresh}
        refreshControl={<RefreshControl progressViewOffset={120} refreshing={isLoading} onRefresh={doRefresh} tintColor={'white'} size={10} />}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
      />
    </View>
  )
}

export default Timeline
