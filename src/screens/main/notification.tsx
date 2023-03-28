import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import AllScreen from './notification/all'
import MentionsScreen from './notification/mentions'

import { NavigationTopContainer } from '../../components/navigation/indicator-top'

const tab = createMaterialTopTabNavigator()

const NotificationScreen = ({ route }: any) => {
  const { setTopIndex, setBottomTabIndicatorIndex } = route.params
  return (
    <NavigationTopContainer
      BottomTabIndicatorIndexAdd={0}
      setTopIndex={setTopIndex}
      setBottomTabIndicatorIndex={setBottomTabIndicatorIndex}
    >
      <tab.Screen name="All" component={AllScreen} />
      <tab.Screen name="mentions" component={MentionsScreen} />
    </NavigationTopContainer>
  )
}

export default NotificationScreen
