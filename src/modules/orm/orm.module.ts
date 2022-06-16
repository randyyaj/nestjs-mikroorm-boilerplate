import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Module, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostEntity } from '../post/entities/post.entity';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Dictionary, IPrimaryKey } from '@mikro-orm/core';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgresql',
        metadataProvider: TsMorphMetadataProvider,
        dbName: configService.get<string>('DB_DATABASE'),
        port: configService.get<number>('DB_PORT'),
        password: configService.get<string>('DB_PASSWORD'),
        host: configService.get<string>('DB_HOST'),
        user: configService.get<string>('DB_USER'),
        entities: ['**/entities/*.entity.js'],
        entitiesTs: ['**/*.entity.ts'],
        highlighter: new SqlHighlighter(),
        migrations: {
          path: './migrations',
          disableForeignKeys: false,
          transactional: true,
          allOrNothing: true,
        },
        findOneOrFailHandler(entityName: string, where: Dictionary | IPrimaryKey) {
          return new NotFoundException(`Entity ${entityName} not found - with query ${JSON.stringify(where)}`)
        },
      }),
      inject: [ConfigService],
    }),
    /* Register all entities here and import the OrmModule in desired module */
    MikroOrmModule.forFeature([PostEntity]),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
