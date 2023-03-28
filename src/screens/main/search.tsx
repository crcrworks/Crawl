import React from 'react'
import { Center, Box, Text, View, useColorModeValue } from 'native-base'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationTopContainer } from '../../components/navigation/indicator-top'
import InnerSearchScreen from './search/search'

const tab = createMaterialTopTabNavigator()

const SearchScreen = ({ route }: any) => {
  const { setTopIndex, setBottomTabIndicatorIndex } = route.params

  return (
    <NavigationTopContainer
      BottomTabIndicatorIndexAdd={2}
      setTopIndex={setTopIndex}
      setBottomTabIndicatorIndex={setBottomTabIndicatorIndex}
    >
      <tab.Screen name="Search" component={InnerSearchScreen} />
    </NavigationTopContainer>
  )
}

export default SearchScreen
