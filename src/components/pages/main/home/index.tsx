//libraries
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { View, Text } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

//components
import Profile from '@/components/shared/profile/index'
import LocalScreen from './local'
import GlobalScreen from './global'

//container
import NavigationTopContainer from '@/components/navigation/top-bar'

const tab = createMaterialTopTabNavigator()
const stack = createStackNavigator()

const HomeScreen = ({ route }: any) => {
  return (
    <View flex={1} _dark={{ bg: 'black.900' }}>
      <View
        flex={1}
        _dark={{ bg: 'black.300' }}
        _light={{ bg: 'white.300' }}
        borderRadius={40}
        overflow="hidden"
      >
        <stack.Navigator screenOptions={{ headerShown: false }}>
          <stack.Screen name="HomeContent" component={HomeContent} />
          <stack.Screen name="Profile" component={Profile} />
        </stack.Navigator>
      </View>
    </View>
  )
}

const HomeContent = () => {
  return (
    <View flex={1} _dark={{ bg: 'black.900' }} _light={{ bg: 'white.300' }}>
      <SafeAreaView edges={['top']}>
        <View>
          <Text>top bar</Text>
        </View>
      </SafeAreaView>
      <View flex={1} borderRadius={40} overflow="hidden">
        <NavigationTopContainer>
          <tab.Screen name="Local" component={LocalScreen} />
          <tab.Screen name="Global" component={GlobalScreen} />
        </NavigationTopContainer>
      </View>
    </View>
  )
}

export default HomeScreen
