import { useEffect } from 'react'
import { View, Center, useTheme, themeTools, useColorModeValue, useColorMode } from 'native-base'
import { Platform } from 'react-native'
import { createMaterialTopTabNavigator, MaterialTopTabBar } from '@react-navigation/material-top-tabs'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Defs, RadialGradient, Svg, Stop, Rect } from 'react-native-svg'
import { TabBar } from 'react-native-tab-view'
import { rgba } from 'polished'

import CreateNoteIcon from '@/components/create-note-button'

type NavigationBottomContainerProps = {
  initialRouteName: string
  children: React.ReactNode
}

const tab = createMaterialTopTabNavigator()

const NavigationBottomContainer = (props: NavigationBottomContainerProps) => {
  const { children, initialRouteName } = props
  const theme = useTheme()
  const color = {
    accent: themeTools.getColor(theme, 'accent.100'),
    active: themeTools.getColor(theme, useColorModeValue('black.100', 'white.100')),
    inactive: themeTools.getColor(theme, useColorModeValue('black.1', 'white.1')),
    border: themeTools.getColor(theme, useColorModeValue('black.0', 'white.0')),
    indicator: themeTools.getColor(theme, useColorModeValue('black.300', 'white.300')),
    background: themeTools.getColor(theme, useColorModeValue('white.300', 'black.300'))
  }

  return (
    <tab.Navigator
      tabBarPosition="bottom"
      initialRouteName={initialRouteName}
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
          justifyContent: 'center',
          bottom: 8
        },
        tabBarActiveTintColor: color.active,
        tabBarInactiveTintColor: color.inactive,
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
            translateX.value = withTiming((width / length) * index + width / length / 4, {
              easing: Easing.elastic(),
              duration: 500
            })
          }, [indicatorProps])

          return (
            <Animated.View
              style={[
                {
                  bottom: 1,
                  width: width / length / 2,
                  height: 1,

                  backgroundColor: color.indicator,
                  borderRadius: 100
                },
                animatedStyles
              ]}
            />
          )
        }
      }}
      tabBar={tabBarProps => {
        return (
          <View position="absolute" bottom={0} w={'100%'} zIndex={400}>
            <LinearGradient colors={[rgba(color.background, 0), rgba(color.background, 1)]} start={{ x: 0.5, y: 0.2 }} end={{ x: 0.5, y: 0.5 }}>
              <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
                <View h="70px" justifyContent="flex-end" mb={Platform.OS === 'ios' ? 0 : 3}>
                  <View flexDirection={'row'}>
                    <View
                      flex={1}
                      h="35px"
                      borderLeftRadius={0}
                      borderRightRadius={100}
                      borderColor={color.border}
                      borderTopWidth={1}
                      borderRightWidth={1}
                      borderBottomWidth={1}
                      bg="#00000083"
                    >
                      <MaterialTopTabBar {...tabBarProps} />
                    </View>
                    <View w="110px">
                      <CreateNoteIcon />
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </LinearGradient>
          </View>
        )
      }}
    >
      {children}
    </tab.Navigator>
  )
}

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
  const colorEnd = themeTools.getColor(theme, useColorModeValue('light.300', 'dark.300'))

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

export default NavigationBottomContainer
