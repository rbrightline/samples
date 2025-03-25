import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FileUploadModule } from './file-upload.module';

async function bootstrap() {
  const app = await NestFactory.create(FileUploadModule);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('File upload example')
    .setDescription('The file upload API description')
    .setVersion('1.0')
    .addTag('Files')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  Logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstap');
}

bootstrap();
