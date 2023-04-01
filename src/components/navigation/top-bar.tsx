import React from 'react'
import { TabBar } from 'react-native-tab-view'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'
import { Box, themeTools, useColorMode, useTheme, View } from 'native-base'
import { useSharedValue } from 'react-native-reanimated'

import SidebarIcon from '../sidebar-icon'
import { border } from 'native-base/lib/typescript/theme/styled-system'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

interface NavigationTopIndicatorProps {
  index: number
  navigationProps: any
}

const NavigationTopIndicator = (props: NavigationTopIndicatorProps) => {
  const { index, navigationProps } = props

  const { colorMode } = useColorMode()

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
        bottom: colorMode === 'dark' ? 0 : 1,
        width: `${100 / navigationProps.state.routes.length / 2}%`,
        height: 2,
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0
      }}
    />
  )
}

const tab = createMaterialTopTabNavigator()

interface NavigationTopContainerProps {
  children: React.ReactNode
  // BottomTabIndicatorIndexAdd: number
  // setTopIndex: any
  // setBottomTabIndicatorIndex: any
}

export const NavigationTopContainer = (props: NavigationTopContainerProps) => {
  const {
    children
    // setTopIndex,
    // setBottomTabIndicatorIndex,
    // BottomTabIndicatorIndexAdd
  } = props

  const theme = useTheme()
  const [color1, color2] = [
    themeTools.getColor(theme, 'accent.100'),
    themeTools.getColor(theme, 'accent.200')
  ]

  return (
    <tab.Navigator
      initialRouteName="Timeline"
      tabBarPosition="top"
      tabBar={tabBarProps => {
        return (
          <View position="absolute" width={'100%'} zIndex={100}>
            <SafeAreaView style={{ flex: 1 }}>
              <View flexDirection={'row'} style={{ top: 10 }}>
                <View width={20}>
                  <SidebarIcon />
                </View>
                <LinearGradient
                  colors={[color1, color2]}
                  start={{ x: 0.0, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    flex: 1,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 20
                  }}
                >
                  <MaterialTopTabBar {...tabBarProps} />
                </LinearGradient>
              </View>
            </SafeAreaView>
          </View>
        )
      }}
      screenOptions={{
        tabBarStyle: {
          flex: 1,
          height: 30,
          backgroundColor: 'transparent'
        },
        tabBarLabelStyle: {
          color: 'white',
          fontSize: 15,
          top: -5
        },

        tabBarIndicator: navigationProps => {
          const index = navigationProps.state.index
          const number = navigationProps.state.routes.length
          // const indicatorIndex = index + BottomTabIndicatorIndexAdd
          // if (setTopIndex) setTopIndex(index)
          // if (setBottomTabIndicatorIndex)
          //   setBottomTabIndicatorIndex(indicatorIndex)
          return (
            <NavigationTopIndicator
              index={index}
              navigationProps={navigationProps}
            />
          )
        }
      }}
    >
      {children}
    </tab.Navigator>
  )
}

export default NavigationTopIndicator
