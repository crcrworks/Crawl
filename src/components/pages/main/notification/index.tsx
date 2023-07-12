//libraries
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { NavigationTopContainer } from '@/components/navigation/top-bar'
import { View, Text } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

//components
import AllScreen from './all'
import MentionsScreen from './mentions'

const tab = createMaterialTopTabNavigator()

const NotificationScreen = ({ route }: any) => {
  return (
    <View flex={1} _dark={{ bg: 'black.900' }} _light={{ bg: 'white.300' }}>
      <SafeAreaView edges={['top']}>
        <View>
          <Text>top bar</Text>
        </View>
      </SafeAreaView>
      <View flex={1} borderRadius={40} overflow="hidden">
        <NavigationTopContainer>
          <tab.Screen name="All" component={AllScreen} />
          <tab.Screen name="Mentions" component={MentionsScreen} />
        </NavigationTopContainer>
      </View>
    </View>
  )
}

export default NotificationScreen
