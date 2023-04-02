import * as React from 'react'
import { View, Text, Box, Center, VStack } from 'native-base'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Timeline from 'crawl/src/components/timeline'
import { SafeAreaView } from 'react-native-safe-area-context'

function LocalScreen() {
  return (
    <View flex={1} _dark={{ bg: 'black.300' }} _light={{ bg: 'white.300' }}>
      <SafeAreaView>
        <View top={70}>
          <Timeline />
        </View>
      </SafeAreaView>
    </View>
  )
}

export default LocalScreen
