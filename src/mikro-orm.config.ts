import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as dotenv from 'dotenv';
dotenv.config();

/** Static configuration only used for executing MikroORM CLI commands - See {@link OrmModule} for app specific MikroORM Properties */
const MikroOrmConfig: Options = {
  type: 'postgresql',
  metadataProvider: TsMorphMetadataProvider,
  dbName: process.env.DB_DATABASE,
  port: +process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  entities: ['**/entities/*.entity.js'],
  entitiesTs: ['**/*.entity.ts'],
  highlighter: new SqlHighlighter(),
  migrations: {
    path: './migrations',
    disableForeignKeys: false,
    transactional: true,
    allOrNothing: true,
  },
};

export default MikroOrmConfig;
