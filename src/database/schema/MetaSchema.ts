import { ColumnType } from 'kysely'

export interface Meta {
  key: string
  value: ColumnType<number | boolean | string>
}
