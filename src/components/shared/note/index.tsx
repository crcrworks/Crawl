//libraries
import { useMemo } from 'react'

//types
import { Note } from '@/types/entities/Note'
import { ProfileScreenNavigationProp } from '@/types/ProfileNavigation'

//components
import MkNote from './note'
import MkRenote from './renote'

type AppearNoteProps = {
  appearNote: Note
  setIsOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>
  navigation: ProfileScreenNavigationProp
}

const AppearNote = (props: AppearNoteProps) => {
  const { appearNote } = props

  const AppearNote = useMemo(() => {
    switch (appearNote.type) {
      case 'note':
        return <MkNote {...props} />
      case 'renote':
        return <MkRenote {...props} />
      default:
        return null
    }
  }, [appearNote])
  return AppearNote
}

export default AppearNote
