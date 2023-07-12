//libraries
import { MotiView, useAnimationState } from 'moti'
import { Avatar, Text, View } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Easing as MotiEasing } from 'react-native-reanimated'

//types
import { Note } from '@/types/entities/Note'
import { User } from '@/types/entities/User'
import { ProfileScreenNavigationProp } from '@/types/ProfileNavigation'

//components
import MkReaction from './reactions'
import MkTime from './time'

import parseEmojiCodeToEmoji from '@/models/entities/emojiCode-to-emoji'

type MkHeaderProps = {
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  noteId: string
  children: React.ReactNode
  createdAt: string
  user: User
  reactions: Note['reactions']
  navigation: ProfileScreenNavigationProp
}

const MkHeader = (props: MkHeaderProps) => {
  const { setIsOpenBottomSheet, noteId, children, createdAt, user, reactions, navigation } = props

  const animationState = useAnimationState({
    tap: {
      scale: 0.98
    },
    leave: {
      scale: 1
    }
  })

  const handlePressProfile = async () => {
    navigation.navigate('Profile', { user })
  }

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
        <MotiView
          state={animationState}
          transition={{ type: 'timing', duration: 200, easing: MotiEasing.ease }}
        >
          <View flexDirection="row" w="100%" maxW="100%" px={2} py={1}>
            <TouchableOpacity
              style={{ top: 15, margin: 2, marginRight: 2, height: 40 }}
              onPress={handlePressProfile}
            >
              <Avatar
                source={{ uri: user.avatarUrl }}
                width="40px"
                height="40px"
                borderRadius={100}
              />
            </TouchableOpacity>
            <View flexDirection="column" justifyContent="center" mx={2} maxW="82%">
              <View flexDirection="row">
                <View flexDirection="row" width="78%" overflow="hidden">
                  <Text color="white.300" fontSize={15} fontWeight="bold" numberOfLines={1}>
                    {parseEmojiCodeToEmoji(<Text color="white">{user.name}</Text>)}
                  </Text>
                  <Text color="white.0" ml={2} fontSize={12} numberOfLines={1}>
                    {`@${user.username}`}
                  </Text>
                </View>
                <View position="absolute" right={0} mx={3}>
                  {createdAt && <MkTime fontSize={12} date={createdAt} />}
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

export default MkHeader
