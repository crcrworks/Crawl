//libraries
import React, { ReactNode, useEffect, useState } from 'react'
import { Text, Image, View } from 'react-native'
import reactStringReplace from 'react-string-replace'
import * as mfm from 'mfm-js'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

//types
import { RootState } from '@/redux/store'

import { unique } from '@/misc/prelude/array'
import { setEmojis } from '@/redux/reducer/emojis'

const parseEmojiCodeToEmoji = (node: ReactNode): ReactNode => {
  const replacedJSXElement = replaceTextWithImage(node)
  return <View>{replacedJSXElement}</View>
}

const replaceTextWithImage = (element: ReactNode): ReactNode => {
  // const { emojis } = useSelector((state: RootState) => state.emojis)
  const [emojis, setEmojis] = useState<any>([])
  // useEffect(() => {
  //   axios
  //     .get('https://misskey.io/api/emojis')
  //     .then(res => {
  //       setEmojis(res.data.emojis)
  //     })
  //     .catch(err => console.log(err))
  // }, [])

  if (!React.isValidElement(element)) {
    // elementがJSX.Element型でない場合は、そのまま返す
    return element
  }

  const { children } = element.props
  if (typeof children === 'string') {
    // childrenが文字列の場合、正規表現でテキストを検索してImageタグに置換する
    const regex = /:([^:\s]*(?:::[^:\s]*)*?):/

    const replacedChildren = reactStringReplace(children, regex, (match, i) => {
      const emojiCode = match.split('@')[0]

      // Noteをparseした時点でImageを生成して非同期処理の中でdispatchしてやれば解決じゃね????????

      const emoji = emojis.find((e: any) => e.name === emojiCode)
      if (!emoji) return null

      return (
        <Image key={i} source={{ uri: emoji.url }} alt="emoji" style={{ height: 20, width: 20 }} />
      )
    }).map((child, index) => (typeof child === 'string' ? <Text key={index}>{child}</Text> : child))

    return <Text>{replacedChildren}</Text>
  }

  const replacedChildren = React.Children.map(children, child => replaceTextWithImage(child))

  if (!element || !replacedChildren) return null
  return React.cloneElement(element, {}, ...replacedChildren)
}

export const extractCustomEmojisFromMfm = (nodes: mfm.MfmNode[]): string[] => {
  const emojiNodes = mfm.extract(nodes, node => {
    return node.type === 'emojiCode' && node.props.name.length <= 100
  }) as mfm.MfmEmojiCode[]

  return unique(emojiNodes.map(x => x.props.name))
}

export default parseEmojiCodeToEmoji

// import React, { useEffect, useState } from 'react';
//
// function EmojiList() {
//   const [emojiURL, setEmojiURL] = useState('');
//
//   useEffect(() => {
//     fetch('https://misskey.io/api/emojis')
//       .then((response) => response.json())
//       .then((data) => {
//         // レスポンスの一部のデータを取得する
//         const emoji = data.emojis.find((e) => e.name === 'iiyo');
//         if (emoji) {
//           setEmojiURL(emoji.url);
//         }
//       })
//       .catch((error) => console.log(error));
//   }, []);
//
//   return (
//     <div>
//       {/* 取得した絵文字のURLを表示 */}
//       <img src={emojiURL} alt="iiyo emoji" />
//     </div>
//   );
// }
//
// export default EmojiList;
