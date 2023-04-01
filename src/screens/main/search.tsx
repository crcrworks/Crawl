import React from 'react'
import { Center, Box, Text, View, useColorModeValue } from 'native-base'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationTopContainer } from '../../components/navigation/top-bar'
import InnerSearchScreen from './search/search'

const tab = createMaterialTopTabNavigator()

const SearchScreen = ({ route }: any) => {
  const { setTopIndex, setBottomTabIndicatorIndex } = route.params

  return (
    <NavigationTopContainer
      BottomTabIndicatorIndexAdd={4}
      setTopIndex={setTopIndex}
      setBottomTabIndicatorIndex={setBottomTabIndicatorIndex}
    >
      <tab.Screen name="InsideSearch" component={InnerSearchScreen} />
    </NavigationTopContainer>
  )
}

export default SearchScreen
