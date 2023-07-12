import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const OpenButton = () => {
  // eslint-disable-next-line
  const navigation = useNavigation<DrawerNavigationProp<{}>>()

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

export default OpenButton
