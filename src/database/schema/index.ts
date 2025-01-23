import { Meta } from './MetaSchema'
import { Profile } from './ProfileSchema'
import { Settings } from './SettingsSchema'
import { TallyGroup } from './TallyGroupSchema'
import { Tally } from './TallySchema'

export interface Schema {
  meta: Meta
  profile: Profile
  settings: Settings
  tallyGroup: TallyGroup
  tally: Tally
}
