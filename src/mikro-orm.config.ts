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
  clientUrl: process.env.DATABASE_URL,
  debug: true,
  logger: logger.log.bind(logger),
  driverOptions: {
    ...(process.env.NODE_ENV === 'production' && {
      connection: { ssl: { rejectUnauthorized: false } },
    }),
  },
  seeder: {
    path: 'dist/seeders',
    pathTs: 'src/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
};

export default config;
