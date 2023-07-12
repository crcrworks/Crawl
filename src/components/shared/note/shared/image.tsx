//libraries
import { Image, View } from 'native-base'

//types
import { DriveFile } from '@/types/entities/DriveFile'

type MkImageProps = {
  files: DriveFile[]
}

const MkImage = (props: MkImageProps) => {
  const { files } = props

  if (!files.some(file => file.type === 'image/jpeg' || file.type === 'image/png')) return null

  return (
    <View
      bg="black.200"
      mb={1}
      p={2}
      borderTopRadius={20}
      borderBottomLeftRadius={5}
      borderBottomRightRadius={20}
    >
      <View flex={1} flexWrap="wrap" flexDirection="row" borderRadius={18} overflow="hidden">
        {files.map((file, index) => {
          if (index > 4) return
          if (file.type === 'image/jpeg' || file.type === 'image/png')
            return (
              <Image
                key={file.id}
                source={{ uri: 'https://placehold.jp/150x150.png' }}
                alt="icon"
                w="40%"
                h="100"
                ml={index === 0 || index === 2 ? 0 : '2px'}
                mb={index === 0 || index === 0 ? 0 : '5px'}
                flexGrow={1}
              />
            )
        })}
      </View>
    </View>
  )
}

export default MkImage
