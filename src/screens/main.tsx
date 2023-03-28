import React, { useState, useRef, useEffect, createContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Text,
  Box,
  Center,
  Icon,
  View,
  VStack,
  useColorModeValue
} from 'native-base'
import { Feather, Ionicons, Entypo, FontAwesome } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import shortid from 'shortid'
import { useAtom } from 'jotai'

import SearchScreen from './main/search'
import TimelineScreen from './main/timeline'
import NotificationScreen from './main/notification'
import NavigationBottomIndicators from '../components/navigation/indicator-bottom'
import { TopTabIndexAtom, BottomTabIndicatorIndexAtom } from '../atoms/atoms'

const tab = createMaterialTopTabNavigator()

export interface TopTabState {
  index: number
  number: number
}

const Main = () => {
  const [topTabIndex, setTopIndex] = useAtom(TopTabIndexAtom)
  const [bottomTabIndicatorIndex, setBottomTabIndicatorIndex] = useAtom(
    BottomTabIndicatorIndexAtom
  )

  const [bottomTabIndex, setBottomTabIndex] = useState(0)

  return (
    <View flex={1} backgroundColor="primary.300">
      <SafeAreaView style={{ flex: 1 }}>
        <tab.Navigator
          initialRouteName="Timeline"
          tabBarPosition="bottom"
          screenOptions={{
            tabBarIndicator: props => {
              setBottomTabIndex(props.state.index)
              return <NavigationBottomIndicators bottomTabProps={props} />
            },
            tabBarShowLabel: false,
            tabBarIconStyle: {
              top: -4
            }
          }}
        >
          <tab.Screen
            name="Notification"
            component={NotificationScreen}
            initialParams={{
              setTopIndex,
              setBottomTabIndicatorIndex
            }}
            options={{
              tabBarIcon: ({ color }) => (
                <Icon as={Ionicons} name="notifications"></Icon>
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
              tabBarIcon: ({ color }) => <Icon as={Entypo} name="home"></Icon>
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
                <Icon as={FontAwesome} name="search"></Icon>
              )
            }}
          />
        </tab.Navigator>
      </SafeAreaView>
    </View>
  )
}

export default Main
