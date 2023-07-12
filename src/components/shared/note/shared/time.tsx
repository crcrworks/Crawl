import React from 'react'
import { Text } from 'native-base'

import locales from '@/../locales/JP.json'

type MkTimeProps = {
  fontSize: number
  date: string
}

const agoMessages = locales.ago

const MkTime = (props: MkTimeProps) => {
  const { fontSize, date } = props

  const relative = (() => {
    const ago = (new Date().getTime() - new Date(date).getTime()) / 1000 //ms

    let result
    if (ago >= 31536000) {
      result = `${Math.round(ago / 31536000)}${agoMessages.yearsAgo}`
    } else if (ago >= 2592000) {
      result = `${Math.round(ago / 2592000)}${agoMessages.monthsAgo}`
    } else if (ago >= 604800) {
      result = `${Math.round(ago / 604800)}${agoMessages.weeksAgo}`
    } else if (ago >= 86400) {
      result = `${Math.round(ago / 86400)}${agoMessages.weeksAgo}`
    } else if (ago >= 3600) {
      result = `${Math.round(ago / 3600)}${agoMessages.hoursAgo}`
    } else if (ago >= 60) {
      result = `${Math.round(ago / 60)}${agoMessages.minutesAgo}`
    } else if (ago >= 10) {
      result = `${Math.round(ago % 60)}${agoMessages.secondsAgo}`
    } else if (ago >= -1) {
      result = `${agoMessages.justNow}`
    } else {
      result = `${agoMessages.future}`
    }
    return result
  })()

  return (
    <Text fontSize={fontSize} color="white.1">
      {relative}
    </Text>
  )
}

export default MkTime
