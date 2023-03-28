import React, { useCallback } from 'react'
import { HStack, IconButton, Icon } from 'native-base'
import { Feather, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const AccountIcon = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  return <IconButton icon={<Icon as={Entypo} name="emoji-happy" />} />
}

export default AccountIcon
