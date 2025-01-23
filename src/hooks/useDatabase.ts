import { Schema } from '@/src/database/schema'
import { useKysely } from 'kysely-expo'

export const useDatabase = useKysely<Schema>
