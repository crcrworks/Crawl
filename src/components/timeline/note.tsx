import React, { useEffect, useMemo, useState, useRef, useCallback, createRef, ReactNode } from 'react'
import { LayoutAnimation, TouchableOpacity, Animated, Easing } from 'react-native'
import { View, Text, Center, Image, Avatar, useColorMode, useColorModeValue } from 'native-base'
import * as Haptics from 'expo-haptics'
import * as mfm from 'mfm-js'
import misskey from 'misskey-js'
import { GestureEvent, State, TapGestureHandler, TapGestureHandlerEventPayload, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { withTiming, useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, Easing as MotiEasing } from 'react-native-reanimated'

import Time from '../time'
import shortid from 'shortid'
import { Note, NoteUnion, RenoteUnion } from '@/types/Note'
import { MotiView, useAnimationState } from 'moti'
import { apiGet } from '@/scripts/api'
import parseToReactNode from '@/models/entities/mfmNode-to-reactNode'
import { sendReaction } from '@/models/api/timeline/fetch'

type AppearNoteProps = {
  appearNote: Note
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
}

const AppearNote = (props: AppearNoteProps) => {
  const { appearNote } = props

  const AppearNote = useMemo(() => {
    switch (appearNote.type) {
      case 'note':
        return <MkNote {...props} />
      case 'renote':
        return <MkRenote {...props} />
      default:
        return <MkNote {...props} />
    }
  }, [appearNote])
  return AppearNote

  // const AppearNote = useMemo(() => {
  //   if (appearNote.type === 'note') return <MkNote {...props} />
  //   else return <MkRenote {...props} />
  // }, [appearNote, appearNote.reactions])
}

const MkNote = (props: AppearNoteProps) => {
  const { appearNote, setIsOpenBottomSheet } = props
  if (appearNote.type !== 'note') return null
  const appearRenote = appearNote.renote

  return (
    <MkHeader
      setIsOpenBottomSheet={setIsOpenBottomSheet}
      noteId={appearNote.id}
      createdAt={appearNote.createdAt}
      avatarUrl={appearNote.user.avatarUrl}
      user={{
        name: appearNote.user.name,
        username: appearNote.user.username
      }}
      reactions={appearNote.reactions}
    >
      {appearRenote && (
        <MkQuote
          createdAt={appearRenote.createdAt}
          avatarUrl={appearRenote.user.avatarUrl}
          user={{
            name: appearRenote.user.name,
            username: appearRenote.user.username
          }}
          text={parseToReactNode(appearRenote.text!)}
        />
      )}

      <MkImage files={appearNote.files} />
      <View flexDirection="column" alignItems="flex-start">
        <View bg="black.200" borderTopLeftRadius={5} borderTopRightRadius={20} borderBottomRightRadius={20} borderBottomLeftRadius={20}>
          {appearNote.text && <MkMessage text={parseToReactNode(appearNote.text)} />}
        </View>
      </View>
    </MkHeader>
  )
}

// const QuoteRenote = (props: AppearNoteProps) => {
//   const { appearNote, setIsOpenBottomSheet } = props
//   const appearRenote = appearNote.renote!

//   return (
//     <MkHeader
//       setIsOpenBottomSheet={setIsOpenBottomSheet}
//       noteId={appearNote.id}
//       createdAt={appearNote.createdAt}
//       avatarUrl={appearNote.user.avatarUrl}
//       user={{
//         name: appearNote.user.name,
//         username: appearNote.user.username
//       }}
//       reactions={appearNote.reactions}
//     >
//       <MkQuote
//         createdAt={appearRenote.createdAt}
//         avatarUrl={appearRenote.user.avatarUrl}
//         user={{
//           name: appearRenote.user.name,
//           username: appearRenote.user.username
//         }}
//         text={appearRenote.text!}
//       />
//       <MkMessage textContent={appearNote.text} />
//     </MkHeader>
//   )
// }

const MkRenote = (props: AppearNoteProps) => {
  const { appearNote, setIsOpenBottomSheet } = props

  if (appearNote.type !== 'renote' || appearNote.user.username === undefined) return null

  return (
    <View flexDirection="column" my={3}>
      <View flexDirection="row" left="50px" zIndex={1}>
        <View flexDirection="row" bg="accent.100" px={1} borderRadius={100}>
          {/* <Avatar
            mr={1}
            source={{ uri: appearNote.user.avatarUrl }}
            width={8}
            height={8}
            borderRadius={100}
          /> */}
          <Center mx={1}>
            <Text color="white.300" bold={true}>
              {appearNote.renoterInfo.user.name}
            </Text>
          </Center>
          <Center mx={1}>
            <Text color="white.1">{`@${appearNote.renoterInfo.user.username}`}</Text>
          </Center>
        </View>
        <Center ml={1}>
          <Time fontSize={12} date={appearNote.renoterInfo.createdAt} />
        </Center>
      </View>
      <View
        position="absolute"
        width={10}
        height="50px"
        ml={2}
        top={2}
        left="26px"
        bg="transparent"
        borderRadius={15}
        borderLeftWidth={3}
        borderTopWidth={3}
        borderColor="black.200"
      />
      <MkHeader
        setIsOpenBottomSheet={setIsOpenBottomSheet}
        noteId={appearNote.id}
        createdAt={appearNote.createdAt}
        avatarUrl={appearNote.user.avatarUrl}
        user={{
          name: appearNote.user.name,
          username: appearNote.user.username
        }}
        reactions={appearNote.reactions}
      >
        <MkImage files={appearNote.files} />
        {appearNote.text && <MkMessage text={parseToReactNode(appearNote.text)} />}
      </MkHeader>
    </View>
  )
}

type MkHeader = {
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  noteId: string
  children: React.ReactNode
  createdAt: string
  avatarUrl: string
  user: {
    name: string
    username: string
  }
  reactions: Note['reactions']
}

const MkHeader = (props: MkHeader) => {
  const { setIsOpenBottomSheet, noteId, children, createdAt, avatarUrl, user, reactions } = props

  const animationState = useAnimationState({
    tap: {
      scale: 0.98
    },
    leave: {
      scale: 1
    }
  })

  return (
    <View mb={3}>
      <TouchableOpacity
        delayLongPress={300}
        activeOpacity={1}
        style={{}}
        onPressIn={() => animationState.transitionTo('tap')}
        onPressOut={() => animationState.transitionTo('leave')}
        onLongPress={() => {
          animationState.transitionTo('leave')
          setIsOpenBottomSheet(true)
        }}
      >
        <MotiView state={animationState} transition={{ type: 'timing', duration: 200, easing: MotiEasing.ease }}>
          <View flexDirection="row" w="100%" maxW="100%" px={2} py={1}>
            <TouchableOpacity
              style={{ top: 15, margin: 2, marginRight: 2, height: 40 }}
              onPress={() => {
                console.log(user.name)
              }}
            >
              <Avatar source={{ uri: avatarUrl }} width="40px" height="40px" borderRadius={100} />
            </TouchableOpacity>
            <View flexDirection="column" justifyContent="center" mx={2} maxW="82%">
              <View flexDirection="row">
                <View flexDirection="row" width="78%" overflow="hidden">
                  <Text color="white.300" fontSize={15} fontWeight="bold" numberOfLines={1}>
                    {user.name}
                  </Text>
                  <Text color="white.0" ml={2} fontSize={12} numberOfLines={1}>
                    {`@${user.username}`}
                  </Text>
                </View>
                <View position="absolute" right={0} mx={3}>
                  {createdAt && <Time fontSize={12} date={createdAt} />}
                </View>
              </View>
              <View flexDirection="column">{children}</View>
            </View>
          </View>
        </MotiView>
      </TouchableOpacity>

      <View ml={60} /*maxH={105} overflow="hidden"*/>
        <MkReaction noteId={noteId} reactions={reactions} />
      </View>
    </View>
  )
}

type MkReactionProps = {
  noteId: string
  reactions: Note['reactions']
}

const MkReaction = (props: MkReactionProps) => {
  const { noteId, reactions } = props

  const animatedScales = useMemo(() => {
    return reactions.map(() => new Animated.Value(1))
  }, [reactions])

  const handleTap = async (event: GestureEvent<TapGestureHandlerEventPayload>, index: number, emoji: string) => {
    const { nativeEvent } = event

    switch (nativeEvent.state) {
      case State.BEGAN:
        Animated.timing(animatedScales[index], {
          toValue: 0.95,
          useNativeDriver: true,
          duration: 300,
          easing: Easing.elastic(2)
        }).start()
        break
      case State.ACTIVE:
        Animated.timing(animatedScales[index], {
          toValue: 0.95,
          useNativeDriver: true,
          duration: 300,
          easing: Easing.elastic(2)
        }).start()
        await sendReaction(noteId, emoji)

        break
      case State.END:
        Animated.timing(animatedScales[index], {
          toValue: 1,
          useNativeDriver: true,
          duration: 300,
          easing: Easing.elastic(2)
        }).start()

        break

      default:
        Animated.timing(animatedScales[index], {
          toValue: 1,
          useNativeDriver: true,
          duration: 300,
          easing: Easing.elastic(2)
        }).start()

        break
    }
  }
  LayoutAnimation.configureNext({
    duration: 500,
    update: { type: 'spring', springDamping: 1 }
  })

  return (
    <View flexDirection="row" flexWrap="wrap">
      {reactions.map((item, index) => {
        return (
          <View key={item.id}>
            <TapGestureHandler onHandlerStateChange={event => handleTap(event, index, reactions[index].emoji)}>
              <MotiView
                from={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 10
                }}
              >
                <Animated.View
                  style={{
                    transform: [
                      {
                        scale: animatedScales[index]
                      }
                    ]
                  }}
                >
                  <View
                    flexDirection="row"
                    mt={1}
                    mx="2px"
                    px={2}
                    py={1}
                    bg={item.isContainsMe ? 'accent.300' : 'transparent'}
                    borderColor={'white.0'}
                    borderWidth={1}
                    borderRadius={100}
                    fontSize={10}
                  >
                    <Text mx={1}>{item.emoji}</Text>
                    <View w="1px" h="100%" mx={1} bg="white.0" borderRadius={100}></View>
                    <Text mx={1}>{item.count}</Text>
                  </View>
                </Animated.View>
              </MotiView>
            </TapGestureHandler>
          </View>
        )
      })}
    </View>
  )
}

type MkMessageProps = {
  text: ReactNode[]
}

const MkMessage = (props: MkMessageProps) => {
  const { text } = props

  return (
    <View flexDirection="column" alignItems="flex-start">
      <View px={5} py={4} bg="black.200" borderTopLeftRadius={5} borderTopRightRadius={20} borderBottomRightRadius={20} borderBottomLeftRadius={20}>
        <View flexDirection="row" flexWrap="wrap">
          {text}
        </View>
      </View>
    </View>
  )
}

type MkImageProps = {
  files: misskey.entities.DriveFile[]
}

const MkImage = (props: MkImageProps) => {
  const { files } = props

  if (!files.some(file => file.type === 'image/jpeg' || file.type === 'image/png')) return null

  return (
    <View bg="black.200" mb={1} p={2} borderTopRadius={20} borderBottomLeftRadius={5} borderBottomRightRadius={20}>
      <View flex={1} flexWrap="wrap" flexDirection="row" borderRadius={18} overflow="hidden">
        {files.map((file, index) => {
          if (index > 4) return
          if (file.type === 'image/jpeg' || file.type === 'image/png')
            return (
              <Image
                key={file.id}
                source={{ uri: 'https://placehold.jp/150x150.png' }}
                alt="icon"
                w="40%"
                h="100"
                ml={index === 0 || index === 2 ? 0 : '2px'}
                mb={index === 0 || index === 0 ? 0 : '5px'}
                flexGrow={1}
              />
            )
        })}
      </View>
    </View>
  )
}

type MkQuoteProps = {
  createdAt: string
  avatarUrl: string
  user: {
    name: string
    username: string
  }
  text: ReactNode[]
}

const MkQuote = (props: MkQuoteProps) => {
  const { createdAt, avatarUrl, user, text } = props

  return (
    <View
      maxW="100%"
      px={3}
      py={4}
      mb={1}
      bg="black.200"
      borderTopLeftRadius={20}
      borderTopRightRadius={20}
      borderBottomRightRadius={20}
      borderBottomLeftRadius={5}
    >
      <View flexDirection="row">
        <Image
          source={{ uri: avatarUrl }}
          alt="icon"
          style={{
            width: 30,
            height: 30,
            borderRadius: 100
          }}
        />

        <View flexDirection="column" justifyContent="center" mx={2} maxW="90%">
          <View flexDirection="row">
            <View flexDirection="row" width="78%" overflow="hidden">
              <Text color="white.300" fontSize={12} fontWeight="bold" numberOfLines={1}>
                {user.name}
              </Text>
              <Text color="white.0" ml={2} fontSize={12} numberOfLines={1}>
                {`@${user.username}`}
              </Text>
            </View>
            <View position="absolute" right={0} mx={3}>
              <Time fontSize={12} date={createdAt} />
            </View>
          </View>
          <View
            px={3}
            py={2}
            bg="transparent"
            borderColor="white.0"
            borderWidth={1}
            borderTopLeftRadius={1}
            borderTopRightRadius={10}
            borderBottomRightRadius={10}
            borderBottomLeftRadius={10}
          >
            <View>{text}</View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AppearNote
