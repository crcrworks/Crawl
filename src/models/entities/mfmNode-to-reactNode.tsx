import React, { ReactNode, useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { Text, useColorModeValue, Image } from 'native-base'
import * as mfm from 'mfm-js'
import { View } from 'native-base'
import shortid from 'shortid'

const parseToReactNode = (inputText: string): ReactNode[] => {
  const parsedReactNode = mfm.parse(inputText).map((node: mfm.MfmNode) => {
    return MfmNode({ node })
  })

  return parsedReactNode
}

const MfmNode = (props: { node: mfm.MfmNode }) => {
  const { node } = props
  if (!node) return null

  switch (node.type) {
    case 'bold':
      return (
        <Text key={shortid.generate()} fontWeight="bold" color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'small':
      return (
        <Text key={shortid.generate()} fontSize={12} color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'strike':
      return (
        <Text key={shortid.generate()} textDecorationLine="line-through" color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'italic':
      return (
        <Text key={shortid.generate()} fontStyle="italic" color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'fn':
      return (
        <Text key={shortid.generate()} color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'blockCode':
      return <Text color={'white.300'}>{node.props.code}</Text>
    case 'center':
      return (
        <Text key={shortid.generate()} textAlign="center" color={'white.300'}>
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'emojiCode':
      return (
        <Text key={shortid.generate()} color={'yellow.300'}>
          <Image
            source={{
              uri: 'https://s3.arkjp.net/misskey/0c74af91-d35b-496d-84b0-7e8a9ab14b7b.gif'
            }}
            alt={node.props.name}
            style={{ width: 10, height: 10 }}
          ></Image>
        </Text>
      )
    case 'unicodeEmoji':
      return (
        <Text key={shortid.generate()} color={'yellow.300'}>
          {node.props.emoji}
        </Text>
      )
    case 'hashtag':
      return (
        <Text
          key={shortid.generate()}
          color="blue.300"
          onPress={() => console.log(`Pressed ${node.props.hashtag}`)}
        >
          {`#${node.props.hashtag}`}
        </Text>
      )
    case 'inlineCode':
      return <Text key={shortid.generate()} /*fontFamily="mono" */>{node.props.code}</Text>
    case 'mathInline':
      return <Text key={shortid.generate()} /*fontFamily="mono" */>{node.props.formula}</Text>
    case 'mathBlock':
      return <Text key={shortid.generate()} /*fontFamily="mono" */>{node.props.formula}</Text>
    case 'link':
      return (
        <Text
          key={shortid.generate()}
          color="blue.300"
          onPress={() => console.log(`Pressed ${node.props.url}`)}
        >
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'mention':
      return (
        <Text
          key={shortid.generate()}
          color="blue.300"
          onPress={() => console.log(`Pressed ${node.props.acct}`)}
        >
          {node.props.acct}
        </Text>
      )
    case 'quote':
      return (
        <Text key={shortid.generate()} fontStyle="italic" color="white.300">
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )
    case 'text':
      return (
        <Text key={shortid.generate()}>
          {node.props.text.split(/\r\n|\r|\n/).map((text, index) => (
            <Text key={shortid.generate()} fontSize={17} color="white.300">
              {text}
            </Text>
          ))}
        </Text>
      )
    case 'url':
      return (
        <Text
          key={shortid.generate()}
          color="blue.300"
          onPress={() => Linking.openURL(node.props.url)}
        >
          {node.props.url}
        </Text>
      )
    case 'search':
      return (
        <Text
          key={shortid.generate()}
          color="blue.300"
          onPress={() => Linking.openURL(`https://www.google.com/search?q=${node.props.query}`)}
        >
          {node.props.content}
        </Text>
      )
    case 'plain':
      return (
        <Text key={shortid.generate()} color="white.300">
          {node.children.map(child => (
            <MfmNode key={shortid.generate()} node={child} />
          ))}
        </Text>
      )

    default:
      return <View key={shortid.generate()} />
  }
}

export default parseToReactNode
