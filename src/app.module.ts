import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { OrmModule } from './modules/orm/orm.module';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), OrmModule, PostModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
