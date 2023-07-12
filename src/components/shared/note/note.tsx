//libraries
import { useLinkTo } from '@react-navigation/native'
import { Text, View } from 'native-base'

//types
import { Note } from '@/types/entities/Note'
import { ProfileScreenNavigationProp } from '@/types/ProfileNavigation'

//components
import MkHeader from './shared/header'
import MkImage from './shared/image'
import MkMessage from './shared/message'
import MkQuote from './shared/quote'

import parseEmojiCodeToEmoji from '@/models/entities/emojiCode-to-emoji'
import parseToReactNode from '@/models/entities/mfmNode-to-reactNode'

type MkNoteProps = {
  appearNote: Note
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  navigation: ProfileScreenNavigationProp
}
const MkNote = (props: MkNoteProps) => {
  const { appearNote, setIsOpenBottomSheet, navigation } = props

  if (appearNote.type !== 'note') return null
  const appearRenote = appearNote.renote
  const linkTo = useLinkTo()

  return (
    <MkHeader
      setIsOpenBottomSheet={setIsOpenBottomSheet}
      noteId={appearNote.id}
      createdAt={appearNote.createdAt}
      user={appearNote.user}
      reactions={appearNote.reactions}
      navigation={navigation}
    >
      {appearRenote && (
        <MkQuote
          createdAt={appearRenote.createdAt}
          avatarUrl={appearRenote.user.avatarUrl}
          user={{ name: appearRenote.user.name, username: appearRenote.user.username }}
          text={parseEmojiCodeToEmoji(<Text>{parseToReactNode(appearRenote.text!)}</Text>)}
        />
      )}

      <MkImage files={appearNote.files} />
      <View flexDirection="column" alignItems="flex-start">
        <View
          bg="black.200"
          borderTopLeftRadius={5}
          borderTopRightRadius={20}
          borderBottomRightRadius={20}
          borderBottomLeftRadius={20}
        >
          {appearNote.text && <MkMessage text={<Text>{parseToReactNode(appearNote.text)}</Text>} />}
        </View>
      </View>
    </MkHeader>
  )
}

export default MkNote
