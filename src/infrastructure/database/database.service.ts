import { Injectable, Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

const DATABASE = 'DATABASE';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(DATABASE) private readonly db: PostgresJsDatabase,
  ) {}

  getDatabase(): PostgresJsDatabase {
    return this.db;
  }
}
