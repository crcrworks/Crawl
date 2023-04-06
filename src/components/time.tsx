import React from 'react'
import { View, Text } from 'native-base'

import locales from '@/../locales/JP.json'

type Props = {
  fontSize: number
  date: string
}

const agoMessages = locales.ago

const Time = (props: Props) => {
  const { fontSize, date } = props

  const relative = (() => {
    const ago = (new Date().getTime() - new Date(date).getTime()) / 1000 //ms

    return ago >= 31536000
      ? `${Math.round(ago / 31536000)}${agoMessages.yearsAgo}`
      : ago >= 2592000
      ? `${Math.round(ago / 2592000)}${agoMessages.monthsAgo}`
      : ago >= 604800
      ? `${Math.round(ago / 604800)}${agoMessages.weeksAgo}`
      : ago >= 86400
      ? `${Math.round(ago / 86400)}${agoMessages.weeksAgo}`
      : ago >= 3600
      ? `${Math.round(ago / 3600)}${agoMessages.hoursAgo}`
      : ago >= 60
      ? `${Math.round(ago / 60)}${agoMessages.minutesAgo}`
      : ago >= 10
      ? `${Math.round(ago % 60)}${agoMessages.secondsAgo}`
      : ago >= -1
      ? `${agoMessages.justNow}`
      : `${agoMessages.future}`
  })()

  return (
    <Text fontSize={fontSize} color="white.1">
      {relative}
    </Text>
  )
}

export default Time
