import { Center, View } from 'native-base'
import React from 'react'

const Header = React.memo(() => {
  return (
    <View mt="20px">
      <Center>
        {/* <Text my={5} color={'white.0'} top={0}>
              上へスクロールして全てリロード
            </Text> */}
      </Center>
    </View>
  )
})

export default Header
