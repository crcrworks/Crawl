import { ScrollView, Text, View } from 'native-base'

const Emojis = () => {
  return (
    <ScrollView mt={1}>
      <View flexDirection="row">
        <View px={5} py={1} borderRadius={100} borderWidth={1} borderColor="white.0">
          <Text fontSize={15}>:Twitter:</Text>
        </View>
      </View>
    </ScrollView>
  )
}
export default Emojis
