import { MikroORM } from '@mikro-orm/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await runMigrations(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(3000);
}

/** Run MikroORM migrations when app starts */
async function runMigrations(app: INestApplication): Promise<void> {
  const orm = app.get(MikroORM);
  const migrator = orm.getMigrator();
  await migrator.up();
}

bootstrap();
