import { Generated } from 'kysely'

interface Base {
  id: Generated<number>
  created_at: Generated<Date>
  updated_at: Generated<Date>
}

export interface Profile extends Base {
  name: string
}

export type ProfilePartial<K extends keyof Profile> = PartialPick<Profile, K>
