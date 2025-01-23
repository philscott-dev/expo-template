import { Generated } from 'kysely'

interface Base {
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface Settings extends Base {
  theme: 'light' | 'dark' | 'system'
  enableHaptics: boolean
}

export type SettingsPartial<K extends keyof Settings> = PartialPick<Settings, K>
