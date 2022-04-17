import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  type: 'postgresql',
  host: process.env.DATANASE_HOST,
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  debug: true,
  logger: logger.log.bind(logger),
};

export default config;
