import React from 'react'
import { Text, HStack, Switch, useColorMode } from 'native-base'

function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode !== 'dark'}
        onToggle={toggleColorMode}
      ></Switch>
      <Text>Light</Text>
    </HStack>
  )
}

export default ThemeToggle
