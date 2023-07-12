//libraries
import NavigationTopContainer from '@/components/navigation/top-bar'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { View, Text } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

//components
import InsideSearch from './inside-search'

const tab = createMaterialTopTabNavigator()

const SearchScreen = ({ route }: any) => {
  return (
    <View flex={1} _dark={{ bg: 'black.900' }} _light={{ bg: 'white.300' }}>
      <SafeAreaView edges={['top']}>
        <View>
          <Text>top bar</Text>
        </View>
      </SafeAreaView>
      <View flex={1} borderRadius={40} overflow="hidden">
        <NavigationTopContainer>
          <tab.Screen name="InsideSearch" component={InsideSearch} />
        </NavigationTopContainer>
      </View>
    </View>
  )
}

export default SearchScreen
