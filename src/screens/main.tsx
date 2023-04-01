import React, { useState, useRef, useEffect, createContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Text,
  Box,
  Center,
  Icon,
  View,
  VStack,
  useColorModeValue,
  Overlay,
  useTheme
} from 'native-base'
import { Feather, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'
import shortid from 'shortid'
import { Defs, RadialGradient, Svg, Stop, Rect } from 'react-native-svg'

import { useAtom } from 'jotai'
import { TopTabIndexAtom, BottomTabIndicatorIndexAtom } from '../atoms/atoms'

import SearchScreen from './main/search'
import TimelineScreen from './main/timeline'
import NotificationScreen from './main/notification'
import NavigationBottomContainer from '../components/navigation/bottom-bar'
import SidebarIcon from '../components/sidebar-icon'
import { BlurView } from 'expo-blur'

const tab = createMaterialTopTabNavigator()

export interface TopTabState {
  index: number
  number: number
}

const Main = () => {
  return (
    <View flex={1} backgroundColor={useColorModeValue('light.300', 'dark.300')}>
      <NavigationBottomContainer>
        <tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon as={Ionicons} name="notifications" color={color}></Icon>
            )
          }}
        />
        <tab.Screen
          name="Timeline"
          component={TimelineScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon as={Entypo} name="home" color={color}></Icon>
            )
          }}
        />
        <tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon as={FontAwesome} name="search" color={color}></Icon>
            )
          }}
        />
      </NavigationBottomContainer>
    </View>
  )
}

export default Main
