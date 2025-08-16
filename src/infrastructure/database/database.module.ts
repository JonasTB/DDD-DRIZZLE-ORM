import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { DatabaseService } from './database.service';

const DATABASE = 'DATABASE';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: (configService: ConfigService) => {
        const connectionString = `postgresql://${configService.get('DB_USER')}:${configService.get('DB_PASSWORD')}@${configService.get('DB_HOST')}:${configService.get('DB_PORT')}/${configService.get('DB_NAME')}`;
        
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const postgres = require('postgres');
        const client = postgres(connectionString);
        return drizzle(client);
      },
      inject: [ConfigService],
    },
    DatabaseService,
  ],
  exports: [DATABASE, DatabaseService],
})
export class DatabaseModule {}
