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
import { Feather } from '@expo/vector-icons'

import ThemeToggle from 'crawl/src/components/theme-toggle'
import SidebarIcon from 'crawl/src/components/sidebar-icon'
import { SafeAreaView } from 'react-native-safe-area-context'

function Sidebar(props: DrawerContentComponentProps) {
  return (
    <View _dark={{ bg: 'black.200' }} _light={{ bg: 'white.200' }} flex={1}>
      <SafeAreaView>
        <ThemeToggle />
      </SafeAreaView>
    </View>
  )
}

export default Sidebar
