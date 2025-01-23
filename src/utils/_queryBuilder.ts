/**
 * Implementing a NoOpDialect for `kysely` to
 * utilize it as a query builder for `expo-sqlite`
 * and avoid writing raw SQL
 */
import {
  Dialect,
  Driver,
  DatabaseConnection,
  MigrationLockOptions,
  DialectAdapter,
  Kysely,
  SqliteQueryCompiler,
  DatabaseIntrospector,
  SchemaMetadata,
  DatabaseMetadataOptions,
  TableMetadata,
  DatabaseMetadata,
} from 'kysely'

class NoOpDialect implements Dialect {
  createDriver() {
    return new NoOpDriver()
  }
  createQueryCompiler() {
    return new SqliteQueryCompiler()
  }
  createAdapter() {
    return new NoOpDialectAdapter()
  }
  createIntrospector(db: Kysely<any>) {
    return new NoOpDatabaseIntrospector()
  }
}

class NoOpDriver implements Driver {
  async init(): Promise<void> {}
  async beginTransaction(): Promise<void> {}
  async commitTransaction(): Promise<void> {}
  async rollbackTransaction(): Promise<void> {}
  async releaseConnection(): Promise<void> {}
  async destroy(): Promise<void> {}
  async acquireConnection(): Promise<DatabaseConnection> {
    throw new Error('No database connection available.')
  }
}

class NoOpDialectAdapter implements DialectAdapter {
  get supportsTransactionalDdl(): boolean {
    return false
  }

  get supportsReturning(): boolean {
    return false
  }

  supportsNativeUpsert(): boolean {
    return false
  }

  get supportsCreateIfNotExists(): boolean {
    return false
  }
  acquireMigrationLock(db: Kysely<any>, options: MigrationLockOptions): Promise<void> {
    return new Promise(() => {})
  }

  releaseMigrationLock(db: Kysely<any>, options: MigrationLockOptions): Promise<void> {
    return new Promise(() => {})
  }
}

class NoOpDatabaseIntrospector implements DatabaseIntrospector {
  getSchemas(): Promise<SchemaMetadata[]> {
    return new Promise(() => {})
  }
  getTables(options?: DatabaseMetadataOptions): Promise<TableMetadata[]> {
    return new Promise(() => {})
  }
  getMetadata(options?: DatabaseMetadataOptions): Promise<DatabaseMetadata> {
    return new Promise(() => {})
  }
}

export function makeQueryBuilder<T>() {
  return new Kysely<T>({
    dialect: new NoOpDialect(),
  })
}

export const queryBuilder = makeQueryBuilder<AppSchema>()
