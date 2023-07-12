//libraries
import { useState, useEffect } from 'react'
import { Center, View } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

//types
import { User, UserDetailed } from '@/types/entities/User'

//components
import { apiGet } from '@/scripts/api'

const Profile = ({ route }: any) => {
  const { id } = route.params.user as User
  const [userData, setUserData] = useState<User>()

  useEffect(() => {
    apiGet('users/show', { userId: id }).then(res => {
      // setUserData(res as UserDetailed)
    })
  }, [id])

  return (
    <View flex={1} _dark={{ bg: 'black.300' }} _light={{ bg: 'whitie.100' }}>
      <SafeAreaView edges={['top']}>
        <Center></Center>
      </SafeAreaView>
    </View>
  )
}

export default Profile
