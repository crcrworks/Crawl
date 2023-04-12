import React, { useState, useRef, useEffect, createContext } from 'react'
import { Text, Box, Center, Icon, View, VStack, useColorModeValue, Overlay, useTheme } from 'native-base'
import { Defs, RadialGradient, Svg, Stop, Rect } from 'react-native-svg'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, Ionicons, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createMaterialTopTabNavigator, MaterialTopTabBar, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import shortid from 'shortid'

import { BlurView } from 'expo-blur'

import SearchScreen from '@/screens/main/search'
import HomeScreen from '@/screens/main/home'
import NotificationScreen from '@/screens/main/notification'
import NavigationBottomContainer from '@/components/navigation/bottom-bar'
import SidebarIcon from '@/components/sidebar-icon'

const tab = createMaterialTopTabNavigator()

export type TopTabState = {
  index: number
  number: number
}

const Main = () => {
  return (
    <View flex={1} backgroundColor={useColorModeValue('white.300', 'black.900')}>
      <NavigationBottomContainer initialRouteName="Home">
        <tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon as={Ionicons} name="notifications-outline" color={color} size={5}></Icon>
          }}
        />
        <tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon as={Feather} name="home" color={color} size={5}></Icon>
          }}
        />
        <tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon as={AntDesign} name="search1" color={color} size={5}></Icon>
          }}
        />
      </NavigationBottomContainer>
    </View>
  )
}

export default Main
