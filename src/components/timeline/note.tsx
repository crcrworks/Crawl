import React, { useEffect, useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text, Center, Image, Avatar } from 'native-base'
import * as Haptics from 'expo-haptics'
import * as mfm from 'mfm-js'
import misskey from 'misskey-js'

import Time from '../time'

export type NoteType = 'note' | 'renote' | 'quoteRenote' | 'unknown'

export const JudgementNoteType = (appearNote: misskey.entities.Note): NoteType => {
  if (!(appearNote.cw === null)) return 'unknown'
  if (!appearNote.text) return 'renote'
  if (!appearNote.renoteId) return 'note'
  return 'quoteRenote'
}

type AppearNoteProps = {
  appearNote: misskey.entities.Note
  textContent: any
  renoteTextContent: any
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
}

const AppearNote = (props: AppearNoteProps) => {
  const { appearNote } = props

  if (appearNote.createdAt === undefined) appearNote.createdAt = ''
  if (appearNote.renote && appearNote.renote.createdAt === undefined) appearNote.renote.createdAt = ''

  const AppearNote = useMemo(() => {
    if (JudgementNoteType(appearNote) === 'note') return <Note {...props} />
    if (JudgementNoteType(appearNote) === 'quoteRenote') return <QuoteRenote {...props} />
    if (JudgementNoteType(appearNote) === 'renote') return <Renote {...props} />
    return <View />
  }, [appearNote])

  return AppearNote
}

const Note = (props: AppearNoteProps) => {
  const { appearNote, setIsOpenBottomSheet, textContent } = props

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
    >
      <MkImage files={appearNote.files} />
      <View flexDirection="column" alignItems="flex-start">
        <View bg="black.200" borderTopLeftRadius={5} borderTopRightRadius={20} borderBottomRightRadius={20} borderBottomLeftRadius={20}>
          <MkMessage textContent={textContent} />
        </View>
      </View>
    </MkHeader>
  )
}

const QuoteRenote = (props: AppearNoteProps) => {
  const { appearNote, setIsOpenBottomSheet, textContent } = props
  const appearRenote = appearNote.renote!

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
    >
      <MkQuote
        createdAt={appearRenote.createdAt}
        avatarUrl={appearRenote.user.avatarUrl}
        user={{
          name: appearRenote.user.name,
          username: appearRenote.user.username
        }}
        text={appearRenote.text!}
      />
      <MkMessage textContent={textContent} />
    </MkHeader>
  )
}

const Renote = (props: AppearNoteProps) => {
  const { renoteTextContent, appearNote, setIsOpenBottomSheet } = props

  const appearRenote = appearNote.renote
  if (!appearRenote) return <View />
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
              {appearNote.user.name}
            </Text>
          </Center>
          <Center mx={1}>
            <Text color="white.1">{`@${appearNote.user.username}`}</Text>
          </Center>
        </View>
        <Center ml={1}>
          <Time fontSize={12} date={appearNote.createdAt} />
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
        createdAt={appearRenote.createdAt}
        avatarUrl={appearRenote.user.avatarUrl}
        user={{
          name: appearRenote.user.name,
          username: appearRenote.user.username
        }}
      >
        <MkImage files={appearRenote.files} />
        <MkMessage textContent={renoteTextContent} />
      </MkHeader>
    </View>
  )
}

//以下パーツ

//ヘッダー
//アイコンや名前、投稿時間などが含まれる。
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
}

const MkHeader = (props: MkHeader) => {
  const { setIsOpenBottomSheet, noteId, children, createdAt, avatarUrl, user } = props

  return (
    <TouchableOpacity
      delayLongPress={300}
      activeOpacity={1}
      style={{}}
      onLongPress={() => {
        setIsOpenBottomSheet(true)
      }}
    >
      <View flexDirection="row" w="100%" maxW="100%" p={2}>
        <TouchableOpacity
          style={{ top: 15, margin: 2, height: 40 }}
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
    </TouchableOpacity>
  )
}

//メッセージ
//MfmDONをReactNodeに変換したものを表示
type MkMessage = {
  textContent: any
}

const MkMessage = (props: MkMessage) => {
  const { textContent } = props

  return (
    <View flexDirection="column" alignItems="flex-start">
      <View px={5} py={4} bg="black.200" borderTopLeftRadius={5} borderTopRightRadius={20} borderBottomRightRadius={20} borderBottomLeftRadius={20}>
        <View flexDirection="row" flexWrap="wrap">
          {textContent}
        </View>
      </View>
    </View>
  )
}

//画像/動画
//音声ファイルなどは含まれない。
type MkImage = {
  files: misskey.entities.DriveFile[]
}

const MkImage = (props: MkImage) => {
  const { files } = props

  if (!files.some(file => file.type === 'image/jpeg' || file.type === 'image/png')) return <View />

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

//引用リツイートの内容
type MkQuote = {
  createdAt: string
  avatarUrl: string
  user: {
    name: string
    username: string
  }
  text: string
}

const MkQuote = (props: MkQuote) => {
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
            <Text fontSize={15}>{text}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AppearNote
