import React, { useCallback, useEffect, useState, useReducer } from 'react'
import { FlatList, ScrollView, View, Text } from 'native-base'
import AppearNote from '@/components/note'
import { Connection } from '@/scripts/api'

import { SafeAreaView } from 'react-native-safe-area-context'
import shortid from 'shortid'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated'
import { ListRenderItemInfo, ViewToken } from 'react-native'
import * as misskey from 'misskey-js'
import { localChannel } from '@/init'

type Data = {
  id: string
  note: misskey.entities.Note
}

function AppearNoteList() {
  const [data, setData] = useState<Data[]>([])

  const removeData = useCallback((data: Data) => {
    setData(prevData => {
      return prevData.filter(item => item.id !== data.id)
    })
  }, [])

  const addData = useCallback((data: Data) => {
    setData(prevData => {
      if (prevData.find(n => n.note.id === data.note.id)) return prevData

      if (prevData.length >= 10) {
        prevData.pop()
      }

      return [{ id: shortid.generate(), note: data.note }, ...prevData]
    })
  }, [])

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      removeData(data[i])
    }
  }, [])

  localChannel.on('note', note => {
    if (data.find(n => n.id === note.id)) return

    addData({ id: shortid.generate(), note })
  })

  return (
    <FlatList
      data={data}
      renderItem={item => {
        return <AppearNote appearNote={item.item.note as any} />
      }}
      ListHeaderComponent={() => (
        <View>
          <SafeAreaView edges={['top']}>
            <View height="60px" />
          </SafeAreaView>
          <View>
            <Text mx={5} my={4} fontSize={35} bold={true}>
              Local
            </Text>
          </View>
        </View>
      )}
      ListFooterComponent={() => (
        <View>
          <SafeAreaView edges={['bottom']} />
        </View>
      )}
      scrollIndicatorInsets={{
        right: 5,
        left: 5,
        bottom: 5,
        top: 5
      }}
    ></FlatList>
  )

  // return (
  //   <ScrollView>
  //     <SafeAreaView edges={['top']}>
  //       <View height="60px" />
  //     </SafeAreaView>
  //     <View>
  //       <Text mx={5} my={4} fontSize={35} bold={true}>
  //         Local
  //       </Text>
  //     </View>
  //     <FlatList
  //       data={data}
  //       renderItem={item => {
  //         return <AppearNote appearNote={item.item.note as any} />
  //       }}
  //     ></FlatList>
  //     {/* <SafeAreaView edges={['bottom']}>
  //       <View height="25px" />
  //     </SafeAreaView> */}
  //   </ScrollView>
  // )
}

export default AppearNoteList
