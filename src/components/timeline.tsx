import React from 'react'
import { View } from 'native-base'
import AppearNote from 'crawl/src/components/note'
import { Connection } from 'crawl/src/scripts/api'

import RenoteOnlySample from 'crawl/note-sample/renote-only.json'
import RenoteSample from 'crawl/note-sample/renote.json'
import NoteSample from 'crawl/note-sample/note.json'

function Timeline() {
  Connection()
  return (
    <View>
      <AppearNote appearNote={NoteSample} />
      <AppearNote appearNote={RenoteSample} />
      <AppearNote appearNote={RenoteOnlySample} />
    </View>
  )
}
export default Timeline
