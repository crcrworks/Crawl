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
  Overlay
} from 'native-base'
import { Feather, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'
import shortid from 'shortid'
import { useAtom } from 'jotai'
import { TopTabIndexAtom, BottomTabIndicatorIndexAtom } from '../atoms/atoms'
import SearchScreen from './main/search'
import TimelineScreen from './main/timeline'
import NotificationScreen from './main/notification'
import NavigationBottomContainer from '../components/navigation/bottom-bar'
import SidebarIcon from '../components/sidebar-icon'
import { BlurView } from 'expo-blur'
import { Svg } from 'react-native-svg'

const tab = createMaterialTopTabNavigator()

export interface TopTabState {
  index: number
  number: number
}

const Main = () => {
  const [, setTopIndex] = useAtom(TopTabIndexAtom)
  const [, setBottomTabIndicatorIndex] = useAtom(BottomTabIndicatorIndexAtom)
  const [, setBottomTabIndex] = useState(0)

  return (
    <View flex={1} backgroundColor="primary.300">
      <NavigationBottomContainer setBottomTabIndex={setBottomTabIndex}>
        <tab.Screen
          name="Notification"
          component={NotificationScreen}
          initialParams={{
            setTopIndex,
            setBottomTabIndicatorIndex
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon as={Ionicons} name="notifications" color={color}></Icon>
            )
          }}
        />
        <tab.Screen
          name="Timeline"
          component={TimelineScreen}
          initialParams={{
            setTopIndex,
            setBottomTabIndicatorIndex
          }}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon as={Entypo} name="home" color={color}></Icon>
            )
          }}
        />
        <tab.Screen
          name="Search"
          component={SearchScreen}
          initialParams={{
            setTopIndex,
            setBottomTabIndicatorIndex
          }}
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
