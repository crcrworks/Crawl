import React, { useCallback } from 'react'
import {
  HStack,
  VStack,
  Center,
  Avatar,
  Heading,
  IconButton,
  View,
  Box
} from 'native-base'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import ThemeTogglefrom from './theme-toggle'
import { Feather } from '@expo/vector-icons'
import SidebarIcon from './sidebar-icon'

const Sidebar = (props: DrawerContentComponentProps) => {
  return (
    <View
      _dark={{ bg: 'dark.200' }}
      _light={{ bg: 'light.300' }}
      flex={1}
    ></View>
  )
}

export default Sidebar
