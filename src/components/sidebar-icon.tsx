import React, { useCallback } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { HStack, IconButton, Icon, View, Button } from 'native-base'
import { Feather, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { SafeAreaView } from 'react-native-safe-area-context'

const SidebarIcon = () => {
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
        source={require('../../assets/icon.png')}
        alt="icon"
        style={{
          width: 40,
          height: 40,
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100
        }}
      />
    </TouchableOpacity>
  )
}

export default SidebarIcon
