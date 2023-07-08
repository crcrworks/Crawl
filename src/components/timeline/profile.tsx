import { useState, useEffect } from 'react'
import { View, Center, Text } from 'native-base'
import Miscard from '../miscard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { User, UserDetailed } from '@/types/entities/User'
import { apiGet } from '@/scripts/api'

const Profile = ({ route }: any) => {
  const { id } = route.params.user as User

  const [userData, setUserData] = useState<UserDetailed | null>(null)


  useEffect(() => {
    apiGet('users/show', { userId: id }).then(res => {
      setUserData(res as UserDetailed)
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
