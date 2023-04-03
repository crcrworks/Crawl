import React, { useEffect } from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import LocalScreen from './timeline/local'
import GlobalScreen from './timeline/global'
import { NavigationTopContainer } from '@/components/navigation/top-bar'

const tab = createMaterialTopTabNavigator()

function TimelineScreen({ route }: any) {
  return (
    <NavigationTopContainer>
      <tab.Screen name="Local" component={LocalScreen} />
      <tab.Screen name="Global" component={GlobalScreen} />
    </NavigationTopContainer>
  )
}

export default TimelineScreen
