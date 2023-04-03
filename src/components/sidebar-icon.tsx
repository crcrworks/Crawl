import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { HStack, IconButton, Icon, View, Button, Image } from 'native-base'
import { Feather, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { SafeAreaView } from 'react-native-safe-area-context'

function SidebarIcon() {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  const handlePress = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  return (
    <TouchableOpacity onPress={handlePress}>
      <Image
        source={require('crawl/assets/icon.png')}
        alt="icon"
        w={35}
        h={35}
        ml="auto"
        mr="auto"
        borderRadius={100}
      />
    </TouchableOpacity>
  )
}

export default SidebarIcon
