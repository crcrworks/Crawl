import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Center } from 'native-base'
import { Dimensions } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  SharedValue
} from 'react-native-reanimated'
import shortid from 'shortid'
import { useAtom } from 'jotai'
import { TopTabIndexAtom, BottomTabIndicatorIndexAtom } from '../../atoms/atoms'

import screenState from '../../screens-state'

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

  //bottomTab
  const [bottomTabRoutes, setBottomTabRoutes] = useState<TabRoutes[]>([])
  const [topTabRoutes, setTopTabRoutes] = useState<TabRoutes[]>([])

  //propsを直接受け取る。
  //型がよくわからなかったのでanyを指定している。
  // props = {
  //   state: 型複雑,
  //   layout = { width:number, height:number },
  //   getTabWidth: (index:number) => { },
  // }

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

  let totalTopRouteNumber = 0
  for (let i = 0; i < bottomTabProps.state.routes.length; i++) {
    totalTopRouteNumber += screenState[0][i].length
  }

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
      colorValue.value = withTiming('#367756', { easing: Easing.elastic() })
    } else {
      widthValue.value = withTiming(10, { easing: Easing.elastic() })
      colorValue.value = withTiming('#2D2E31', { easing: Easing.elastic() })
    }
    return [animatedStyle]
  })

  useEffect(() => {}, [bottomTabProps, topTabIndex])

  // const indicatorWidth = useSharedValue(0)

  // const indicatorStyle = useAnimatedStyle(() => {
  //   return {
  //     width: indicatorWidth.value
  //   }
  // })

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
            backgroundColor="primary.300"
          >
            <Center flexDirection="row" m={5}>
              {route.innerRoutes.map((innerRoute, innerIndex) => {
                const isActive = route.isActive && innerIndex === topTabIndex

                // let totalRouteNumber = 0
                // if (index > 0) {
                //   for (let i = 0; i < index; i++) {
                //     totalRouteNumber += screenState[0][i].length
                //   }
                // }

                return (
                  <Animated.View
                    key={innerRoute.id}
                    style={[
                      {
                        left: -4,
                        top: 10,
                        height: 8,
                        margin: 2,
                        borderRadius: 20,
                        backgroundColor: 'white'
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

export default NavigationBottomIndicators
