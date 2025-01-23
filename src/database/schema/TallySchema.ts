import { ColumnType, Generated } from 'kysely'

interface Base {
  id: Generated<number>
  created_at: ColumnType<Date>
  updated_at: ColumnType<Date>
  completed_at: ColumnType<Date>
}
export interface Tally extends Base {
  name: string
  count: number
  tallyGroupId: number
}

export type TallyPartial<K extends keyof Tally> = PartialPick<Tally, K>
