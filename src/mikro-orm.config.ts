import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';

const logger = new Logger('MikroORM');
const config: Options = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },
  type: 'postgresql',
  clientUrl: process.env.DATABASE_URL,
  debug: true,
  logger: logger.log.bind(logger),
  driverOptions: {
    ...(process.env.NODE_ENV === 'production' && {
      connection: { ssl: { rejectUnauthorized: false } },
    }),
  },
};

export default config;
