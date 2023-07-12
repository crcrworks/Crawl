import ThemeToggle from '@/components/theme-toggle'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import { View } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

const Sidebar = (props: DrawerContentComponentProps) => {
  return (
    <View _dark={{ bg: 'black.200' }} _light={{ bg: 'white.200' }} flex={1}>
      <SafeAreaView>
        <ThemeToggle />
      </SafeAreaView>
    </View>
  )
}

export default Sidebar
