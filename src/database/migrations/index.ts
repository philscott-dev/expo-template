import { Kysely, Migrator, sql } from 'kysely'
import { Schema } from '../schema'
import { ExpoMigrationProvider, SQLiteType } from 'kysely-expo'

export const onInit = async (db: Kysely<Schema>) =>
  new Migrator({
    db,
    provider: new ExpoMigrationProvider({
      migrations: {
        '1': {
          up: async (db: Kysely<Schema>) => {
            console.log('running migration 1: initilization')
            try {
              // initialize database here
              sql`begin transaction;`

              await db.schema
                .createTable('meta')
                .ifNotExists()
                .addColumn('key', SQLiteType.String, (col) => col.primaryKey())
                .addColumn('value', SQLiteType.String)
                .execute()

              // default metadata
              const existingMeta = await db
                .selectFrom('meta')
                .select('key')
                .where('key', '=', 'initialized')
                .executeTakeFirst()

              if (!existingMeta) {
                await db
                  .insertInto('meta')
                  .values([
                    { key: 'initialized', value: 'true' },
                    { key: 'is_first_use', value: 'true' },
                  ])
                  .execute()
                console.log('Default meta entries created.')
              } else {
                console.log('Meta entries already exist.')
              }
              console.log('Database initialization complete.')

              // end initialization
              sql`commit;`
            } catch (error) {
              console.error('rolling back:', error)
              sql`rollback;`
              throw error
            }
          },
        },
      },
    }),
  })
