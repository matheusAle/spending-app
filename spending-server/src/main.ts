import { config } from 'dotenv-flow';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ora from 'ora';

// @ts-ignore
global.loading = {
  start: (text: string) => {
    return ora(text).start();
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
