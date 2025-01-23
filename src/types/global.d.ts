import { Schema } from '@/src/database/schema'
import { Kysely } from 'kysely'

declare global {
  type Database = Kysely<Schema>
  type PartialPick<T, K extends keyof T> = Partial<Pick<T, K>>
}
