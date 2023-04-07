import React, { useEffect, useMemo, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text, Center, Image, Avatar, useColorMode, useColorModeValue } from 'native-base'
import * as Haptics from 'expo-haptics'
import * as mfm from 'mfm-js'
import misskey from 'misskey-js'

import Time from '../time'
import shortid from 'shortid'

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

/*

 LOG  {":_effv85b1_@nijimiss.moe:": 2, ":_kawaii@misskey.art:": 1, ":aemoji_bell@.:": 1, ":ara_suteki@.:": 10, ":blobcatheartbongo@nijimiss.moe:": 4, ":eeyan@misskey.design:": 1, ":eeyan_2@.:": 1, ":igyo@.:": 4, ":kawaii@misskey.209.jp:": 1, ":kawaii@misskey.art:": 7, ":kawaiifes@.:": 120, ":kawaiifes@fedibird.com:": 3, ":kawaiii@.:": 11, ":kawaiimatsuri@misskey.design:": 1, ":kawaisugidaro@.:": 3, ":kawaisugiru@.:": 2, ":kawayoi@.:": 5, ":suki_heart@.:": 1, ":suteki2@.:": 2, ":tottemo_cute@.:": 2, "❤": 3, "👍": 24}

 LOG  {":_effv85b1_@nijimiss.moe:": 2, ":_kawaii@misskey.art:": 1, ":aemoji_bell@.:": 1, ":ara_suteki@.:": 10, ":blobcatheartbongo@nijimiss.moe:": 4, ":eeyan@misskey.design:": 1, ":eeyan_2@.:": 1, ":igyo@.:": 4, ":kawaii@misskey.209.jp:": 1, ":kawaii@misskey.art:": 7, ":kawaiifes@.:": 119, ":kawaiifes@fedibird.com:": 3, ":kawaiii@.:": 11, ":kawaiimatsuri@misskey.design:": 1, ":kawaisugidaro@.:": 3, ":kawaisugiru@.:": 2, ":kawayoi@.:": 5, ":suki_heart@.:": 1, ":suteki2@.:": 2, ":tottemo_cute@.:": 2, "❤": 3, "👍": 24}

*/
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
      reactions={appearNote.reactions}
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
      reactions={appearNote.reactions}
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
        reactions={appearRenote.reactions}
      >
        <MkImage files={appearRenote.files} />
        <MkMessage textContent={renoteTextContent} />
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
  reactions: Record<string, number>
}

const MkHeader = (props: MkHeader) => {
  const { setIsOpenBottomSheet, noteId, children, createdAt, avatarUrl, user, reactions } = props

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
          <MkReaction id={noteId} reactions={reactions} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

type MkReactionProps = {
  id: string
  reactions: Record<string, number>
}

const MkReaction = (props: MkReactionProps) => {
  const { id, reactions } = props

  const reactionData: [string, number][] = Object.entries(reactions)

  return (
    <View flexDirection="row" flexWrap="wrap">
      {reactionData.map(item => {
        return (
          <View key={id}>
            <TouchableOpacity>
              <View
                flexDirection="row"
                mt={1}
                mx="2px"
                px={2}
                py={1}
                bg={'transparent'}
                borderColor={'white.0'}
                borderWidth={1}
                borderRadius={100}
                fontSize={10}
              >
                <Text mx={1}>{item[0]}</Text>
                <View w="1px" h="100%" mx={1} bg="white.0" borderRadius={100}></View>
                <Text mx={1}>{item[1]}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}

type MkMessageProps = {
  textContent: any
}

const MkMessage = (props: MkMessageProps) => {
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

type MkImageProps = {
  files: misskey.entities.DriveFile[]
}

const MkImage = (props: MkImageProps) => {
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

type MkQuoteProps = {
  createdAt: string
  avatarUrl: string
  user: {
    name: string
    username: string
  }
  text: string
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
            <Text fontSize={15}>{text}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default AppearNote
