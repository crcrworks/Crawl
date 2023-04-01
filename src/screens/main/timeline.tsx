import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import LocalScreen from './timeline/local'
import GlobalScreen from './timeline/global'
import { NavigationTopContainer } from '../../components/navigation/top-bar'

const tab = createMaterialTopTabNavigator()

const TimelineScreen = ({ route }: any) => {
  const { setTopIndex, setBottomTabIndicatorIndex } = route.params

  return (
    <NavigationTopContainer
      BottomTabIndicatorIndexAdd={2}
      setTopIndex={setTopIndex}
      setBottomTabIndicatorIndex={setBottomTabIndicatorIndex}
    >
      <tab.Screen name="Local" component={LocalScreen} />
      <tab.Screen name="Global" component={GlobalScreen} />
    </NavigationTopContainer>
  )
}

export default TimelineScreen
