import { StackNavigationProp } from '@react-navigation/stack'
import { User } from './entities/User'
type RootStackParamList = {
  NoteList: undefined
  Profile: { user: User }
}
export type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>
