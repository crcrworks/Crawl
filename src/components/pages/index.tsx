//libraries
import { View } from 'native-base'
import { createDrawerNavigator } from '@react-navigation/drawer'

//components
import Sidebar from '@/components/sidebar/index'
import SidebarIcon from '@/components/sidebar/open-button'
import MainScreen from './main/index'
import SettingScreen from './settings/index'

const Drawer = createDrawerNavigator()

const Pages = () => {
  return (
    <View flex={1} borderRadius={100}>
      <Drawer.Navigator
        initialRouteName="Main"
        drawerContent={props => <Sidebar {...props} />}
        screenOptions={{
          headerShown: false,
          swipeEnabled: true,
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

export default Pages
