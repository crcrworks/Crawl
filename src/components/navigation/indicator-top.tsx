import React from 'react'
import { TabBar } from 'react-native-tab-view'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

interface NavigationTopIndicatorProps {
  index: number
  navigationProps: any
}

const NavigationTopIndicator = (props: NavigationTopIndicatorProps) => {
  const { index, navigationProps } = props
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
        bottom: 8,
        left: `${100 / navigationProps.state.routes.length / 4}%`,
        width: `${100 / navigationProps.state.routes.length / 2}%`,
        height: 6,
        backgroundColor: '#367756',
        borderRadius: 10
      }}
    />
  )
}

const tab = createMaterialTopTabNavigator()

interface NavigationTopContainerProps {
  children: React.ReactNode
  BottomTabIndicatorIndexAdd: number
  setTopIndex: any
  setBottomTabIndicatorIndex: any
}

export const NavigationTopContainer = (props: NavigationTopContainerProps) => {
  const {
    children,
    setTopIndex,
    setBottomTabIndicatorIndex,
    BottomTabIndicatorIndexAdd
  } = props

  return (
    <tab.Navigator
      initialRouteName="Timeline"
      tabBarPosition="top"
      style={{
        backgroundColor: '#191919'
      }}
      screenOptions={{
        tabBarStyle: {
          left: '25%',
          width: '50%',
          justifyContent: 'center',
          backgroundColor: 'transparent'
        },
        tabBarLabelStyle: {
          color: 'white',
          top: -5
        },

        tabBarIndicator: navigationProps => {
          const index = navigationProps.state.index
          const number = navigationProps.state.routes.length
          const indicatorIndex = index + BottomTabIndicatorIndexAdd
          if (setTopIndex) setTopIndex(index)
          if (setBottomTabIndicatorIndex)
            setBottomTabIndicatorIndex(indicatorIndex)
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
