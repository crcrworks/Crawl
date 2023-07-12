//libraries
import { View, Text } from 'native-base'

//types
import { ProfileScreenNavigationProp } from '@/types/ProfileNavigation'

//components
import Timeline from '@/components/timeline/index'

const LocalScreen = ({ navigation }: { navigation: ProfileScreenNavigationProp }) => {
  return (
    <View flex={1} _dark={{ bg: 'black.300' }} _light={{ bg: 'white.300' }}>
      <Timeline navigation={navigation} />
    </View>
  )
}

export default LocalScreen
