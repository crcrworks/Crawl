import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { HStack, IconButton, Icon, View, useTheme, themeTools } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { SafeAreaView } from 'react-native-safe-area-context'

const CreateNoteIcon = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()

  const handlePress = useCallback(() => {
    console.log('pushed')
  }, [navigation])

  const theme = useTheme()
  const color = themeTools.getColor(theme, 'accent.100')

  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={handlePress}>
      <View flex={1} w={'80px'} h={'30px'} ml={'auto'} mr={'auto'} backgroundColor={color} borderRadius={100}>
        <Icon as={AntDesign} name="plus" size={4} color="white.100" m="auto" />
      </View>
    </TouchableOpacity>
  )
}

export default CreateNoteIcon
