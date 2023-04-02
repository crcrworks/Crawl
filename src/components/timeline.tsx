import React from 'react'
import { View } from 'native-base'
import Note from 'crawl/src/components/note'
import { Connection } from 'crawl/src/scripts/api'

function Timeline() {
  Connection()
  return (
    <View>
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
      <Note />
    </View>
  )
}

export default Timeline
