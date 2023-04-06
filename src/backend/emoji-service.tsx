import React, { ReactNode } from 'react'
import { Text, Image, ImageSourcePropType, View } from 'react-native'
import reactStringReplace from 'react-string-replace'

export const ConvertEmoji = (node: ReactNode): ReactNode => {
  const replacedJSXElement = replaceTextWithImage(node)
  return <View>{replacedJSXElement}</View>
}

const replaceTextWithImage = (element: ReactNode): ReactNode => {
  if (!React.isValidElement(element)) {
    // elementがJSX.Element型でない場合は、そのまま返す
    return element
  }

  console.log('replacing', element)

  const { children } = element.props
  if (typeof children === 'string') {
    // childrenが文字列の場合、正規表現でテキストを検索してImageタグに置換する
    const regex = /:([^:\s]*(?:::[^:\s]*)*?):/

    console.log(children)

    const replacedChildren = reactStringReplace(children, regex, (match, i) => {
      console.log(match)
      return <Image key={i} source={{ uri: `https://s3.arkjp.net/emoji/${match}.png` }} alt="emoji" style={{ width: 20, height: 20 }} />
    }).map((child, index) => (typeof child === 'string' ? <Text key={index}>{child}</Text> : child))

    return <Text>{replacedChildren}</Text>
  }

  const replacedChildren = React.Children.map(children, child => replaceTextWithImage(child))

  return React.cloneElement(element, {}, ...replacedChildren)
}
