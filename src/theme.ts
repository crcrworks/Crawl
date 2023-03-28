import { extendTheme } from 'native-base'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark'
}

const colors = {
  primary: {
    100: '#2D2E31',
    200: '#1E1E1E',
    300: '#191919'
  },
  accent: {
    100: '#367756'
  }
}

export default extendTheme({ config, colors })
