//libraries
import NavigationBottomContainer from '@/components/navigation/bottom-bar'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useColorModeValue, View, Icon } from 'native-base'

//components
import HomeScreen from './home/index'
import NotificationScreen from './notification/index'
import SearchScreen from './search/index'

import { Feather, Ionicons, Entypo, FontAwesome, AntDesign } from '@expo/vector-icons'

const tab = createMaterialTopTabNavigator()

export type TopTabState = {
  index: number
  number: number
}

const Main = () => {
  return (
    <View flex={1} backgroundColor={useColorModeValue('white.300', 'black.900')}>
      <NavigationBottomContainer initialRouteName="Home">
        <tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon as={Ionicons} name="notifications-outline" color={color} size={5}></Icon>
            )
          }}
        />
        <tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon as={Feather} name="home" color={color} size={5}></Icon>
          }}
        />
        <tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon as={AntDesign} name="search1" color={color} size={5}></Icon>
            )
          }}
        />
      </NavigationBottomContainer>
    </View>
  )
}

export default Main
