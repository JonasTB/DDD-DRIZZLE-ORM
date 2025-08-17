import { Inject, Injectable } from '@nestjs/common'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATABASE') private readonly db: PostgresJsDatabase) {}

  getDatabase(): PostgresJsDatabase {
    return this.db
  }
}
