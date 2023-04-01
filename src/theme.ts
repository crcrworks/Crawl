import { extendTheme } from 'native-base'

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark'
}

const colors = {
  primary: {
    100: '#2D2E31',
    200: '#282828',
    300: '#191919'
  },
  accent: {
    100: '#8E3DFF',
    200: '#B140EB'
  }
}

export default extendTheme({ config, colors })
