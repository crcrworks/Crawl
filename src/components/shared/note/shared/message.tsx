//libraries
import { View } from 'native-base'
import { ReactNode } from 'react'

type MkMessageProps = {
  text: ReactNode
}

const MkMessage = (props: MkMessageProps) => {
  const { text } = props

  return (
    <View flexDirection="column" alignItems="flex-start">
      <View
        px={5}
        py={4}
        bg="black.200"
        borderTopLeftRadius={5}
        borderTopRightRadius={20}
        borderBottomRightRadius={20}
        borderBottomLeftRadius={20}
      >
        <View flexDirection="row" flexWrap="wrap">
          {text}
        </View>
      </View>
    </View>
  )
}

export default MkMessage
