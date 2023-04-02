import React from 'react'
import { View, Text, Center, Image } from 'native-base'
import * as mfm from 'mfm-js'

const inputText = `<center>
Hello $[tada everynyan! 🎉]

I'm @ai, A bot of misskey!

https://github.com/syuilo/ai
</center>`

const mfmTree = mfm.parse(inputText)
console.log()

function Note() {
  return (
    <View flexDirection="row" w="100%" maxW="100%" p={2}>
      <View mx={2}>
        <Image
          source={require('../../assets/icon.png')}
          alt="icon"
          style={{
            top: 15,
            width: 40,
            height: 40,
            borderRadius: 100
          }}
        />
      </View>
      <View flexDirection="column" justifyContent="center" mx={2} maxW="75%">
        <View flexDirection="row">
          <Text color="white.300" fontSize={12} fontWeight="bold">
            CRCR
          </Text>
          <Text color="white.0" ml={2} fontSize={12}>
            @CRCRdayo
          </Text>
        </View>
        <View flexDirection="row">
          <View
            px={5}
            py={3}
            bg="black.200"
            borderTopLeftRadius={5}
            borderTopRightRadius={20}
            borderBottomRightRadius={20}
            borderBottomLeftRadius={20}
          >
            <Text fontSize={15}>へろー</Text>
          </View>
          <View justifyContent="flex-end" mx={1}>
            <Text fontSize={10}>1分前</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Note
