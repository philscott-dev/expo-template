import { ColumnType, Generated } from 'kysely'
import { Tally } from './TallySchema'

interface Base {
  id: Generated<number>
  created_at: ColumnType<Date>
  updated_at: ColumnType<Date>
  completed_at: ColumnType<Date>
}
export interface TallyGroup extends Base {
  name: string
  tally: Tally[]
}

export type TallyGroupPartial<K extends keyof TallyGroup> = PartialPick<TallyGroup, K>
