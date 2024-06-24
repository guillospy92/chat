import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  const port = process.env.PORT || 3000;
  console.log('run application port', port);
  await app.listen(port);
}

bootstrap().then();
