import { extendTheme } from 'native-base'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark'
}

const colors = {
  white: {
    0: '#F8F8F845',
    1: '#F8F8F8C4',
    100: '#F8F8F8',
    200: '#EEEEEE',
    300: '#F5F5F5'
  },
  black: {
    0: '#19191924',
    1: '#191919BA',
    100: '#2D2E31',
    200: '#282828',
    300: '#191919'
  },
  accent: {
    100: '#256A62',
    200: '#BD7D28',
    300: '#BA4918'
  }
}

export default extendTheme({ config, colors })
