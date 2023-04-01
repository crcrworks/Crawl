import { useEffect } from 'react'
import {
  View,
  useTheme,
  themeTools,
  useColorModeValue,
  useColorMode
} from 'native-base'
import { Platform } from 'react-native'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar
} from '@react-navigation/material-top-tabs'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Defs, RadialGradient, Svg, Stop, Rect } from 'react-native-svg'
import { TabBar } from 'react-native-tab-view'

import CreateNoteIcon from '../create-note-button'

interface BackgroundGlowProps {
  color: string
  left: string
  round: number
}

const BackgroundGlow = (props: BackgroundGlowProps) => {
  const { color, left, round } = props
  const isIOS = Platform.OS === 'ios'
  const r = isIOS ? round / 100 : (round - 15) / 100

  const theme = useTheme()
  const colorEnd = themeTools.getColor(
    theme,
    useColorModeValue('light.300', 'dark.300')
  )

  return (
    <View position="absolute" left={left} bottom={isIOS ? -15 : -50} zIndex={0}>
      <Svg height="150" width="300">
        <Defs>
          <RadialGradient
            id="grad-8"
            cx="50%" //Set the radius corner by x
            cy="50%" //Set the radius corner by y
            r={r} //Set the gradient radius
          >
            <Stop
              offset="0"
              stopColor={color} //Set the Gradient color(From)
              stopOpacity="1"
            />
            <Stop
              offset="1"
              stopColor={colorEnd} //Set the Gradient color(To)
              stopOpacity="0" //Set the Gradient color(To)
            />
          </RadialGradient>
        </Defs>
        <Rect x="10" y="10" width="100%" height="130" fill="url(#grad-8)" />
      </Svg>
    </View>
  )
}

interface Props {
  children: React.ReactNode
}

const tab = createMaterialTopTabNavigator()

const NavigationBottomContainer = (props: Props) => {
  const { children } = props
  const theme = useTheme()
  const [color1, color2] = [
    themeTools.getColor(theme, 'accent.100'),
    themeTools.getColor(theme, 'accent.200')
  ]

  return (
    <tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        swipeEnabled: false,
        animationEnabled: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          flex: 1,
          height: 50,
          backgroundColor: 'transparent'
        },

        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center'
        },
        tabBarActiveTintColor: '#F8F8F8',
        tabBarInactiveTintColor: '#F8F8F8C4',
        tabBarIndicator: indicatorProps => {
          const { colorMode } = useColorMode()
          const index = indicatorProps.state.index
          const width = indicatorProps.layout.width
          const length = indicatorProps.state.routes.length

          const translateX = useSharedValue(0)
          const animatedStyles = useAnimatedStyle(() => {
            return {
              transform: [
                {
                  translateX: translateX.value
                }
              ]
            }
          })
          useEffect(() => {
            translateX.value = withTiming(
              (width / length) * index + width / length / 4,
              {
                easing: Easing.elastic()
              }
            )
          }, [indicatorProps])

          return (
            <Animated.View
              style={[
                {
                  width: width / length / 2,
                  height: 2,
                  backgroundColor: 'white',
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10
                },
                animatedStyles
              ]}
            />
          )
        }
      }}
      tabBar={tabBarProps => {
        return (
          <View>
            <View position="absolute" bottom={0} width={'100%'} zIndex={400}>
              <SafeAreaView style={{ flex: 1 }}>
                <View
                  flexDirection={'row'}
                  style={{
                    bottom: 10
                  }}
                >
                  <LinearGradient
                    colors={[color1, color2]}
                    style={{
                      flex: 1,
                      borderTopLeftRadius: 0,
                      borderTopRightRadius: 100,
                      borderBottomRightRadius: 100,
                      borderBottomLeftRadius: 0,
                      backgroundColor: 'red'
                    }}
                    start={{ x: 0.0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <MaterialTopTabBar {...tabBarProps} />
                  </LinearGradient>
                  <View width={20}>
                    <CreateNoteIcon />
                  </View>
                </View>
              </SafeAreaView>
            </View>
            <SafeAreaView edges={['bottom']}>
              <View position="absolute" bottom="0" width="100%" height={100}>
                <BackgroundGlow color={color1} left={'-5%'} round={40} />
                <BackgroundGlow color={color2} left={'20%'} round={50} />
                <BackgroundGlow color={color1} left={'-0%'} round={40} />
              </View>
            </SafeAreaView>
          </View>
        )
      }}
    >
      {children}
    </tab.Navigator>
  )
}

export default NavigationBottomContainer
