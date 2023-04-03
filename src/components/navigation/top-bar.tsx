import React from 'react'
import { TabBar } from 'react-native-tab-view'
import { createMaterialTopTabNavigator, MaterialTopTabBar, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs'
import { Box, themeTools, useColorMode, useTheme, View, useColorModeValue } from 'native-base'
import { useSharedValue } from 'react-native-reanimated'

import SidebarIcon from '@/components/sidebar-icon'
import { border } from 'native-base/lib/typescript/theme/styled-system'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

const tab = createMaterialTopTabNavigator()

type NavigationTopContainerProps = {
  children: React.ReactNode
  // BottomTabIndicatorIndexAdd: number
  // setTopIndex: any
  // setBottomTabIndicatorIndex: any
}

export function NavigationTopContainer(props: NavigationTopContainerProps) {
  const {
    children
    // setTopIndex,
    // setBottomTabIndicatorIndex,
    // BottomTabIndicatorIndexAdd
  } = props

  const theme = useTheme()
  const color = {
    accent: themeTools.getColor(theme, 'accent.100'),
    active: themeTools.getColor(theme, useColorModeValue('black.100', 'white.100')),
    inactive: themeTools.getColor(theme, useColorModeValue('black.1', 'white.1')),
    border: themeTools.getColor(theme, useColorModeValue('black.0', 'white.0')),
    indicator: themeTools.getColor(theme, useColorModeValue('black.300', 'white.300'))
  }

  return (
    <tab.Navigator
      tabBarPosition="top"
      screenOptions={{
        tabBarStyle: {
          flex: 1,
          height: 30,
          backgroundColor: 'transparent'
        },
        tabBarLabelStyle: {
          color: color.active,
          fontSize: 17,
          bottom: 8,
          textTransform: 'none'
        },
        tabBarBounces: true,

        tabBarIndicator: navigationProps => {
          const index = navigationProps.state.index
          const number = navigationProps.state.routes.length

          return (
            <TabBar
              {...navigationProps}
              navigationState={{
                index,
                routes: navigationProps.state.routes
              }}
              style={{
                backgroundColor: 'transparent'
              }}
              indicatorStyle={{
                left: `${100 / navigationProps.state.routes.length / 4}%`,
                bottom: -1,
                width: `${100 / navigationProps.state.routes.length / 2}%`,
                height: 1,
                backgroundColor: color.indicator,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0
              }}
            />
          )
        }
      }}
      tabBar={tabBarProps => {
        return (
          <View position="absolute" w={'100%'} zIndex={100}>
            <SafeAreaView style={{ flex: 1 }}>
              <View flexDirection={'row'} style={{ top: 10, height: 35 }}>
                <View w={20}>
                  <SidebarIcon />
                </View>
                <View
                  flex={1}
                  borderColor={color.border}
                  borderTopWidth={1}
                  borderRightWidth={0}
                  borderBottomWidth={1}
                  borderLeftWidth={1}
                  borderLeftRadius={100}
                  borderRightRadius={0}
                  bg="#00000083"
                >
                  <MaterialTopTabBar {...tabBarProps} />
                </View>
              </View>
            </SafeAreaView>
          </View>
        )
      }}
    >
      {children}
    </tab.Navigator>
  )
}

export default NavigationTopContainer
