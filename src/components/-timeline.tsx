// import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
// import Animated from 'react-native-reanimated'
// import { View, Text, FlatList } from 'native-base'
// import * as misskey from 'misskey-js'
// import shortid from 'shortid'
// import { SafeAreaView } from 'react-native-safe-area-context'

// import NoteSample from '@/../note-sample/note.json'

// import AppearNoteList, { JudgementNoteType, NoteType } from '@/components/note'
// import { localChannel } from '@/init'
// import AppearNote from '@/components/note'
// import { makeStyledComponent } from '@/utils/styled-component'
// import { MotiView } from 'moti'
// import { LayoutAnimation, FlatList as RNFlatlist, VirtualizedList } from 'react-native'

// import { apiGet } from '@/scripts/api'
// import { Spinner } from 'native-base'

// // export type NoteListData = {
// //   id: string
// //   note: misskey.entities.Note
// // }

// function Timeline() {
//   // const [data, setData] = useState<NoteListData[]>([])

// const removeData = useCallback((data: NoteListData) => {
//   setData(prevData => {
//     return prevData.filter(item => item.id !== data.id)
//   })
// }, [])

// const addData = useCallback((data: NoteListData) => {
//   const noteType = JudgementNoteType(data.note)
//   LayoutAnimation.configureNext({
//     duration: 300,
//     update: { type: 'spring', springDamping: 1 }
//   })
//   setData(prevData => {
//     if (prevData.find(n => n.note.id === data.note.id)) return prevData

//     if (prevData.length >= 50) {
//       prevData.pop()
//     }

//     return [...prevData, { id: shortid.generate(), note: data.note, noteType: noteType }]
//   })
// }, [])

// const emit = useCallback(async (note: misskey.entities.Note) => {
//   if (data.find(n => n.id === note.id)) return

//   if (JudgementNoteType(note) === 'unknown') return
//   if (note.createdAt === undefined) return
//   if (note.replyId && note.reply && note.reply.createdAt === undefined) return

//   addData({
//     id: shortid.generate(),
//     note
//   })
//   // scrollToEnd()
// }, [])

// const fetchData = useCallback(async () => {
//   await localChannel.on('note', note => {
//     emit(note)
//   })
// }, [])
// const fetchPosts = async () => {
//   try {
//    const res = await apiGet('notes/local-timeline')
//   }catch(error){
//     console.log(error)
//   }
// }

// useEffect(() => {
//   for (let i = 0; i < data.length; i++) {
//     removeData(data[i])
//   }

//   fetchPosts()

//   localChannel.on('note', emit)

//   return () => {
//     localChannel.off('note')
//   }
// }, [])

// const doLoad = async (limit: number) => {
//   await apiGet('notes/local-timeline', { limit })
//     .then(notes => {
//       notes.forEach(note => {
//         addData({ id: shortid.generate(), note })
//       })
//       setIsLoadingNow(false)
//     })
//     .catch(error => {
//       setIsLoadingNow(false)
//     })
// }

// const isWaitLoading = useRef(false)
// const onTopNow = useRef(true)

// const handleScroll = (event: any) => {
//   const { contentOffset } = event.nativeEvent
//   // if (contentOffset.y < -100) {
//   //   isWaitLoading.current = true
//   // }
//   // if (isWaitLoading.current && contentOffset.y >= 0) {
//   //   isWaitLoading.current = false
//   //   setIsLoadingNow(true)
//   //   doLoad(10)
//   // }
//   // if (contentOffset.y < 10) {
//   //   onTopNow.current = false
//   // } else {
//   //   onTopNow.current = true
//   // }
//   // console.log(onTopNow.current)
//   const yOffset = event.nativeEvent.contentOffset.y
//   // const contentHeight = event.nativeEvent.contentSize.height
//   // const layoutHeight = event.nativeEvent.layoutMeasurement.height

//   // // 一番下にスクロールしているかどうかを判定
//   // if (yOffset >= contentHeight - layoutHeight) {
//   //   console.log('Reached the bottom!')
//   // }
// }

// const [isLoadingNow, setIsLoadingNow] = useState(false)

//id test

// const [noteId, setNoteId] = useState<string[]>([])

// const removeNoteId = useCallback((id: string) => {
//   setNoteId(prevData => {
//     return prevData.filter(item => item !== id)
//   })
// }, [])

// const addNoteId = useCallback((id: string) => {
//   LayoutAnimation.configureNext({
//     duration: 300,
//     update: { type: 'spring', springDamping: 1 }
//   })

//   setNoteId(prevData => {
//     if (prevData.find(n => n === id)) return prevData

//     if (prevData.length >= 50) {
//       prevData.pop()
//     }

//     return [...prevData, id]
//   })
// }, [])

// const emit = async (note: misskey.entities.Note) => {
//   addNoteId(note.id)
// }

// useEffect(() => {
//   localChannel.on('note', emit)
//   return () => {
//     localChannel.off('note')
//   }
// }, [])

// const ChildrenItem = React.memo(({ id }: { id: string }) => {
//   return <Text>{id}</Text>
// })

// const RenderItem = React.memo(({ item }: { item: NoteListData }) => {
//   return (
//     <ChildrenItem id={item.note.id} />
//     // <MotiView
//     //   from={{ opacity: 0, scale: 0.95, translateY: 50 }}
//     //   animate={{ opacity: 1, scale: 1, translateY: 0 }}
//     //   transition={{ type: 'timing', duration: 300 }}
//     // >
//     // <AppearNote appearNote={item.note as any} />
//     // </MotiView>
//   )
// })

//   const ChildrenItem = React.memo(({ id }: { id: string }) => {
//     return <Text>{id}</Text>
//   })

//   const RenderItem = ({ item }: { item: string }) => {
//     return <ChildrenItem id={item} />
//   }

//   // const keyExtractor = useCallback((item: NoteListData) => item.id, [])
//   const keyExtractor = useCallback((item: string) => item, [])

//   const FlatListRender = useMemo(() => {
//     return (
//       <VirtualizedList
//         keyExtractor={keyExtractor}
//         data={noteId}
//         extraData={noteId.length}
//         renderItem={({ item }) => <RenderItem item={item} />}
//         nestedScrollEnabled={true}
//         removeClippedSubviews={true}
//         getItem={(data, index) => data[index]}
//         getItemCount={data => data.length}
//         ListHeaderComponent={() => (
//           <View h="110px">
//             <SafeAreaView edges={['top']} />
//           </View>
//         )}
//         ListFooterComponent={() => (
//           <View h="100px">
//             <SafeAreaView edges={['bottom']} />
//           </View>
//         )}
//       />
//     )
//   }, [noteId])

//   return (
//     <View>
//       <SafeAreaView edges={['top']}>{/* <View top={60}>{isLoadingNow && <Spinner />}</View> */}</SafeAreaView>
//       {FlatListRender}
//     </View>
//   )
// }

// export default Timeline
