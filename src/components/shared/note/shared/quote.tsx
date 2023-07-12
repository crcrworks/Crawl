//libraries
import { Image, Text, View } from 'native-base'
import { ReactNode } from 'react'

//components
import Time from './time'

type MkQuoteProps = {
  createdAt: string
  avatarUrl: string
  user: {
    name: string
    username: string
  }
  text: ReactNode
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

export default MkQuote
