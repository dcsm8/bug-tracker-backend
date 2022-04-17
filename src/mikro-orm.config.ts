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
  dbName: 'bug-tracker',
  type: 'postgresql',
  password: '1234',
  port: 5432,
  debug: true,
  logger: logger.log.bind(logger),
};

export default config;
