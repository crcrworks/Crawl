//libraries
import { Center, Text, View } from 'native-base'

//types
import { Note } from '@/types/entities/Note'
import { ProfileScreenNavigationProp } from '@/types/ProfileNavigation'

//components
import MkHeader from './shared/header'
import MkImage from './shared/image'
import MkMessage from './shared/message'
import MkTime from './shared/time'

import parseEmojiCodeToEmoji from '@/models/entities/emojiCode-to-emoji'
import parseToReactNode from '@/models/entities/mfmNode-to-reactNode'

type MkRenoteProps = {
  appearNote: Note
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  navigation: ProfileScreenNavigationProp
}

const MkRenote = (props: MkRenoteProps) => {
  const { appearNote, setIsOpenBottomSheet, navigation } = props

  if (appearNote.type !== 'renote') return null

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
              {parseEmojiCodeToEmoji(<Text>{appearNote.renoterInfo.user.name}</Text>)}
            </Text>
          </Center>
          <Center mx={1}>
            <Text color="white.1">{`@${appearNote.renoterInfo.user.username}`}</Text>
          </Center>
        </View>
        <Center ml={1}>
          <MkTime fontSize={12} date={appearNote.renoterInfo.createdAt} />
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
        user={appearNote.user}
        reactions={appearNote.reactions}
        navigation={navigation}
      >
        <MkImage files={appearNote.files} />
        {appearNote.text && <MkMessage text={<Text>{parseToReactNode(appearNote.text)}</Text>} />}
      </MkHeader>
    </View>
  )
}

export default MkRenote
