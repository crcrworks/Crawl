import React, { useEffect, useState, useRef } from 'react'
import {
  View,
  Text,
  Center,
  useTheme,
  themeTools,
  useColorModeValue
} from 'native-base'
import { Dimensions, StyleSheet } from 'react-native'
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabBarProps
} from '@react-navigation/material-top-tabs'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  SharedValue
} from 'react-native-reanimated'
import shortid from 'shortid'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Defs, RadialGradient, Svg, Stop, Rect } from 'react-native-svg'

import { useAtom } from 'jotai'
import { TopTabIndexAtom, BottomTabIndicatorIndexAtom } from '../../atoms/atoms'

import screenState, { screenOrganizetion } from '../../screens-state'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'
import { Route } from 'react-native-tab-view'
import CreateNoteIcon from '../create-note-button'
import { shadow } from 'react-native-paper'

interface InnerRoutes {
  id: string
  isActive: boolean
}

interface TabRoutes {
  id: string
  width: number
  height: number
  isActive: boolean
  innerRoutes: InnerRoutes[]
}

interface Props {
  bottomTabProps: any
}

const NavigationBottomIndicators = (props: Props) => {
  const { bottomTabProps } = props
  const [topTabIndex, setTopTabIndex] = useAtom(TopTabIndexAtom)
  const [bottomTabIndicatorIndex, setBottomTabIndicatorIndex] = useAtom(
    BottomTabIndicatorIndexAtom
  )

  useEffect(() => {
    setTopTabIndex(0)
    setBottomTabIndicatorIndex(2)
  }, [])

  //bottomTab
  const [bottomTabRoutes, setBottomTabRoutes] = useState<TabRoutes[]>([])
  const [topTabRoutes, setTopTabRoutes] = useState<TabRoutes[]>([])

  useEffect(() => {
    const newBottomTabRoutes: TabRoutes[] = []
    for (let i = 0; i < bottomTabProps.state.routes.length; i++) {
      const width = bottomTabProps.getTabWidth(i)
      const height = bottomTabProps.layout.height
      const isActive = i === bottomTabProps.state.index

      const innerRoutesNumber = screenState[0][i].length

      const newInnerTabRoutes: InnerRoutes[] = []
      for (let j = 0; j < innerRoutesNumber; j++) {
        newInnerTabRoutes.push({
          id: shortid.generate(),
          isActive: false
        })
      }

      newBottomTabRoutes.push({
        id: shortid.generate(),
        width,
        height,
        isActive,
        innerRoutes: newInnerTabRoutes
      })
    }

    setBottomTabRoutes(newBottomTabRoutes)
  }, [bottomTabProps, topTabIndex])

  const totalTopRouteNumber = screenOrganizetion.screen.main.screenNumber

  const innerWidth = new Array(
    bottomTabProps.state.routes.length * totalTopRouteNumber
  ).fill(2)

  const animatedStyles = innerWidth.map((width, index) => {
    const bottomTabIndex = bottomTabProps.state.index
    const isActive = index === bottomTabIndicatorIndex
    const widthValue: SharedValue<number> = useSharedValue(width)
    const colorValue: SharedValue<string> = useSharedValue('#2D2E31')
    const animatedStyle = useAnimatedStyle(() => {
      return {
        width: widthValue.value,
        backgroundColor: colorValue.value
      }
    })
    if (isActive) {
      widthValue.value = withTiming(30, { easing: Easing.elastic() })
      colorValue.value = withTiming('#F8F8F8', { easing: Easing.elastic() })
    } else {
      widthValue.value = withTiming(10, { easing: Easing.elastic() })
      colorValue.value = withTiming('#F8F8F85D', { easing: Easing.elastic() })
    }
    return [animatedStyle]
  })

  return (
    <View flex={1}>
      {bottomTabRoutes.map((route, index) => {
        const x = route.width * index
        return (
          <View
            key={route.id}
            position="absolute"
            left={x}
            w={route.width}
            h={route.height}
          >
            <Center flexDirection="row" m={5}>
              {route.innerRoutes.map((innerRoute, innerIndex) => {
                const isActive = route.isActive && innerIndex === topTabIndex

                return (
                  <Animated.View
                    key={innerRoute.id}
                    style={[
                      {
                        top: 15,
                        height: 5,
                        marginLeft: 2,
                        marginRight: 2,
                        borderRadius: 3
                      },
                      animatedStyles[
                        index === 0
                          ? innerIndex
                          : innerIndex +
                            index * screenState[0][index - 1].length
                      ]
                    ]}
                  ></Animated.View>
                )
              })}
            </Center>
          </View>
        )
      })}
    </View>
  )
}

interface BackgroundGlowProps {
  color: string
  bottom: number
  left: string
  round: number
}

const BackgroundGlow = (props: BackgroundGlowProps) => {
  const { color, bottom, left, round } = props
  const r = round / 100

  const theme = useTheme()

  const colorEnd = themeTools.getColor(
    theme,
    useColorModeValue('light.300', 'dark.300')
  )

  return (
    <View position="absolute" left={left} bottom={bottom} zIndex={0}>
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

const tab = createMaterialTopTabNavigator()

interface NavigationTopContainerProps {
  children: React.ReactNode
  setBottomTabIndex: React.Dispatch<React.SetStateAction<number>>
}

const NavigationBottomContainer = (props: NavigationTopContainerProps) => {
  const { setBottomTabIndex } = props
  return (
    <tab.Navigator
      initialRouteName="Timeline"
      tabBarPosition="bottom"
      tabBar={tabBarProps => {
        const theme = useTheme()
        const [color1, color2] = [
          themeTools.getColor(theme, 'accent.100'),
          themeTools.getColor(theme, 'accent.200')
        ]

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
            <BackgroundGlow
              color={color1}
              bottom={-20}
              left={'-5%'}
              round={40}
            />
            <BackgroundGlow
              color={color2}
              bottom={-20}
              left={'20%'}
              round={50}
            />
            <BackgroundGlow
              color={color1}
              bottom={-20}
              left={'-0%'}
              round={40}
            />
          </View>
        )
      }}
      screenOptions={{
        swipeEnabled: false,
        animationEnabled: false,
        tabBarIndicator: indicatorProps => {
          setBottomTabIndex(indicatorProps.state.index)
          return <NavigationBottomIndicators bottomTabProps={indicatorProps} />
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          flex: 1,
          height: 50,
          backgroundColor: 'transparent'
        },
        tabBarIconStyle: {
          alignItems: 'center',
          justifyContent: 'center',

          top: -4
        },
        tabBarActiveTintColor: '#F8F8F8',
        tabBarInactiveTintColor: '#F8F8F8C4'
      }}
    >
      {props.children}
    </tab.Navigator>
  )
}

export default NavigationBottomContainer
