import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.listen(3000, () => {
    console.log('🚀 chat app is up and running at http://localhost:3000');
  });
}

bootstrap();
