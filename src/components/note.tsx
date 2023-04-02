import React from 'react'
import { View, Text, Center, Image, Avatar } from 'native-base'
import * as mfm from 'mfm-js'
import misskey from 'misskey-js'
import Time from './time'

interface Props {
  appearNote: misskey.entities.Note
}

function AppearNote(props: Props) {
  const { appearNote } = props

  const noteType: 'note' | 'renote' | 'quoteRenote' = (() => {
    if (!appearNote.text) return 'renote'
    if (!appearNote.renoteId) return 'note'
    return 'quoteRenote'
  })()

  if (noteType === 'note') return <Note {...appearNote} />
  if (noteType === 'quoteRenote') return <QuoteRenote {...appearNote} />
  if (noteType === 'renote') return <Renote {...appearNote} />

  return <View />
}

function Note(appearNote: misskey.entities.Note) {
  return (
    <Header
      createdAt={appearNote.createdAt}
      avatarUrl={appearNote.user.avatarUrl}
      user={{
        name: appearNote.user.name,
        username: appearNote.user.username
      }}
    >
      <Message text={appearNote.text} />
    </Header>
  )
}

function QuoteRenote(appearNote: misskey.entities.Note) {
  const appearRenote = appearNote.renote!

  return (
    <Header
      createdAt={appearNote.createdAt}
      avatarUrl={appearNote.user.avatarUrl}
      user={{
        name: appearNote.user.name,
        username: appearNote.user.username
      }}
    >
      <Quote
        createdAt={appearRenote.createdAt}
        avatarUrl={appearRenote.user.avatarUrl}
        user={{
          name: appearRenote.user.name,
          username: appearRenote.user.username
        }}
        text={appearRenote.text!}
      />
      <Message text={appearNote.text} />
    </Header>
  )
}

function Renote(appearNote: misskey.entities.Note) {
  const appearRenote = appearNote.renote!
  return (
    <View flexDirection="column" my={3}>
      <View flexDirection="row" left="50px" zIndex={1}>
        <View
          flexDirection="row"
          justifyContent="center"
          bg="accent.100"
          px={1}
          borderRadius={100}
        >
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
            <Text color="white.0">{`@${appearNote.user.username}`}</Text>
          </Center>
        </View>
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
      <Header
        createdAt={appearRenote.createdAt}
        avatarUrl={appearRenote.user.avatarUrl}
        user={{
          name: appearRenote.user.name,
          username: appearRenote.user.username
        }}
      >
        <Message text={appearRenote.text} />
      </Header>
    </View>
  )
}

//以下パーツ

interface Header {
  children: React.ReactNode
  createdAt: string
  avatarUrl: string
  user: {
    name: string
    username: string
  }
}

function Header(props: Header) {
  const { children, createdAt, avatarUrl, user } = props
  return (
    <View flexDirection="row" w="100%" maxW="100%" p={2}>
      <Avatar
        mx={2}
        source={{ uri: avatarUrl }}
        top={15}
        width={10}
        height={10}
        borderRadius={100}
      />
      <View flexDirection="column" justifyContent="center" mx={2} maxW="82%">
        <View flexDirection="row">
          <View flexDirection="row" width="78%" overflow="hidden">
            <Text
              color="white.300"
              fontSize={12}
              fontWeight="bold"
              numberOfLines={1}
            >
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
        <View flexDirection="column">{children}</View>
      </View>
    </View>
  )
}

interface Message {
  text: string | null
}

function Message(props: Message) {
  const { text } = props
  return (
    <View flexDirection="column" alignItems="flex-start">
      <View>
        <View
          px={4}
          py={3}
          bg="black.200"
          borderTopLeftRadius={5}
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          borderBottomLeftRadius={20}
        >
          <Text fontSize={15}>{text}</Text>
        </View>
      </View>
    </View>
  )
}

interface Quote {
  createdAt: string
  avatarUrl: string
  user: {
    name: string
    username: string
  }
  text: string
}

function Quote(props: Quote) {
  const { createdAt, avatarUrl, user, text } = props

  return (
    <View>
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
          <View>
            <Image
              source={{ uri: avatarUrl }}
              alt="icon"
              style={{
                width: 30,
                height: 30,
                borderRadius: 100
              }}
            />
          </View>
          <View
            flexDirection="column"
            justifyContent="center"
            mx={2}
            maxW="90%"
          >
            <View flexDirection="row">
              <View flexDirection="row" width="78%" overflow="hidden">
                <Text
                  color="white.300"
                  fontSize={12}
                  fontWeight="bold"
                  numberOfLines={1}
                >
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
    </View>
  )
}

export default AppearNote
