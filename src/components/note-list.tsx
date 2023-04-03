import React, { useCallback, useEffect, useState, useReducer } from 'react'
import { FlatList, ScrollView, View, Text } from 'native-base'
import AppearNote from '@/components/note'
import { Connection } from '@/scripts/api'

import RenoteOnlySample from '@/../note-sample/renote-only.json'
import RenoteSample from '@/../note-sample/renote.json'
import NoteSample from '@/../note-sample/note.json'
import NoteWithImage from '@/../note-sample/note-with-image.json'
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
      if (prevData.find(item => item.id === data.id)) return prevData
      if (prevData.length >= 10) {
        prevData.pop()
      }
      return [data, ...prevData]
    })
  }, [])

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      removeData(data[i])
    }
  }, [])

  const [test, setTest] = useState<misskey.entities.Note[]>([])

  localChannel.on('note', note => {
    // if (data.find(item => item.id === note.id)) return
    // addData({ id: shortid.generate(), note: note as any })
    /* console.log(data.length) */

    if (test.find(n => n.id === note.id)) return

    setData(prevData => {
      if (prevData.find(n => n.note.id === note.id)) return prevData

      if (prevData.length >= 10) {
        prevData.pop()
      }

      return [{ id: shortid.generate(), note: note }, ...prevData]
    })
  })

  useEffect(() => {
    console.log(data.length)
  }, [data])

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
