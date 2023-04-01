import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import {
  HStack,
  IconButton,
  Icon,
  View,
  useTheme,
  themeTools
} from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { SafeAreaView } from 'react-native-safe-area-context'

const CreateNoteIcon = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()

  const handlePress = useCallback(() => {
    console.log('pushed')
  }, [navigation])

  const theme = useTheme()
  const color = themeTools.getColor(theme, 'accent.200')

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
      <View
        flex={1}
        width={'50px'}
        height={'50px'}
        marginLeft={'auto'}
        marginRight={'auto'}
        backgroundColor={color}
        borderRadius={100}
      >
        <Icon
          as={FontAwesome}
          name="pencil"
          size={5}
          color="white"
          margin="auto"
        />
      </View>
    </TouchableOpacity>
  )
}

export default CreateNoteIcon
