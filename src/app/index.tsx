import React from 'react'
import { View } from 'native-base'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { SafeAreaView } from 'react-native-safe-area-context'

import Sidebar from '../components/sidebar'
import MainScreen from '../screens/main'
import SettingScreen from '../screens/setting'
import SidebarIcon from '../components/sidebar-icon'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <View flex={1} borderRadius={100}>
      <Drawer.Navigator
        initialRouteName="Main"
        drawerContent={props => <Sidebar {...props} />}
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
          drawerType: 'back',
          overlayColor: '#00000000'
        }}
      >
        <Drawer.Screen name="Main" component={MainScreen} />
        <Drawer.Screen name="Setting" component={SettingScreen} />
      </Drawer.Navigator>
    </View>
  )
}

export default App
