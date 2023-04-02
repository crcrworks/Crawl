import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import AllScreen from './notification/all'
import MentionsScreen from './notification/mentions'

import { NavigationTopContainer } from '../../components/navigation/top-bar'

const tab = createMaterialTopTabNavigator()

function NotificationScreen({ route }: any) {
  return (
    <NavigationTopContainer>
      <tab.Screen name="All" component={AllScreen} />
      <tab.Screen name="Mentions" component={MentionsScreen} />
    </NavigationTopContainer>
  )
}

export default NotificationScreen
