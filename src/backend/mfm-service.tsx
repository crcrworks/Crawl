import React from 'react'
import { Linking } from 'react-native'
import { Text, useColorModeValue } from 'native-base'
import * as mfm from 'mfm-js'
import { View } from 'native-base'
import shortid from 'shortid'

export const toReactNode = (inputText: string) => {
  return mfm.parse(inputText).map((node: mfm.MfmNode) => {
    return MfmNode({ node, key: shortid.generate() })
  })
}

export const MfmNode = ({ node, key }: { node: mfm.MfmNode; key: string }) => {
  if (!node) return null

  switch (node.type) {
    case 'bold':
      return (
        <Text key={key} fontWeight="bold" color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'small':
      return (
        <Text key={key} fontSize={12} color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'strike':
      return (
        <Text key={key} textDecorationLine="line-through" color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'italic':
      return (
        <Text key={key} fontStyle="italic" color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'fn':
      return (
        <Text key={key} color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'blockCode':
      return <Text color={'white.300'}>{node.props.code}</Text>
    case 'center':
      return (
        <Text key={key} textAlign="center" color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'emojiCode':
      return <Text key={key} color={'yellow.300'}>{`:${node.props.name}:`}</Text>
    case 'unicodeEmoji':
      return (
        <Text key={key} color={'yellow.300'}>
          {node.props.emoji}
        </Text>
      )
    case 'hashtag':
      return (
        <Text key={key} color="blue.300" onPress={() => console.log(`Pressed ${node.props.hashtag}`)}>
          {`#${node.props.hashtag}`}
        </Text>
      )
    case 'inlineCode':
      return <Text key={key} /*fontFamily="mono" */>{node.props.code}</Text>
    case 'mathInline':
      return <Text key={key} /*fontFamily="mono" */>{node.props.formula}</Text>
    case 'mathBlock':
      return <Text key={key} /*fontFamily="mono" */>{node.props.formula}</Text>
    case 'link':
      return (
        <Text key={key} color="blue.300" onPress={() => console.log(`Pressed ${node.props.url}`)}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'mention':
      return (
        <Text key={key} color="blue.300" onPress={() => console.log(`Pressed ${node.props.acct}`)}>
          {node.props.acct}
        </Text>
      )
    case 'quote':
      return (
        <Text key={key} fontStyle="italic" color="white.300">
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'text':
      return (
        <Text key={key}>
          {node.props.text.split(/\r\n|\r|\n/).map((text, index) => (
            <Text key={shortid.generate()} fontSize={17} color="white.300">
              {text}
            </Text>
          ))}
        </Text>
      )
    case 'url':
      return (
        <Text key={key} color="blue.300" onPress={() => Linking.openURL(node.props.url)}>
          {node.props.url}
        </Text>
      )
    case 'search':
      return (
        <Text key={key} color="blue.300" onPress={() => Linking.openURL(`https://www.google.com/search?q=${node.props.query}`)}>
          {node.props.content}
        </Text>
      )
    case 'plain':
      return (
        <Text key={key} color="white.300">
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )

    default:
      return <View key={key} />
  }
}