import { Meta } from './MetaSchema'
import { Profile } from './ProfileSchema'
import { Settings } from './SettingsSchema'

export interface Schema {
  meta: Meta
  profile: Profile
  settings: Settings
}
