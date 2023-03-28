import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

//components
import MainScreen from './screens/main'
import SettingScreen from './screens/setting'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000'
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="Setting" component={SettingScreen} />
    </Drawer.Navigator>
  )
}

export default App
