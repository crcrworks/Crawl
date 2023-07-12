//libraries
import { MotiView } from 'moti'
import { Text, View, Image } from 'native-base'
import { useMemo } from 'react'
import { Animated, Easing, LayoutAnimation } from 'react-native'
import {
  GestureEvent,
  State,
  TapGestureHandler,
  TapGestureHandlerEventPayload
} from 'react-native-gesture-handler'

//types
import { Note } from '@/types/entities/Note'

import { sendReaction } from '@/api/reaction'
import parseEmojiCodeToEmoji from '@/models/entities/emojiCode-to-emoji'

type MkReactionProps = {
  noteId: string
  reactions: Note['reactions']
}

const MkReaction = (props: MkReactionProps) => {
  const { noteId, reactions } = props

  const animatedScales = useMemo(() => {
    return reactions.map(() => new Animated.Value(1))
  }, [reactions])

  const handleTap = async (
    event: GestureEvent<TapGestureHandlerEventPayload>,
    index: number,
    emoji: string
  ) => {
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
            <TapGestureHandler onHandlerStateChange={event => handleTap(event, index, item.code)}>
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
                    <Image
                      source={{ uri: item.url }}
                      alt="emoji"
                      style={{ height: 20, width: 20 }}
                    />

                    {/* {parseEmojiCodeToEmoji(<Text>{item.emoji}</Text>)} */}
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

export default MkReaction
