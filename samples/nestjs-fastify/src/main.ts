import { Controller, Get, Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  DocumentBuilder,
  SwaggerModule,
  ApiSchema,
  ApiProperty,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@ApiSchema()
class User {
  @ApiProperty({ type: 'string', description: 'user id' })
  id: number;

  @ApiProperty({
    type: 'string',
    description: 'unique username in email format',
  })
  username: string;

  @ApiProperty({ type: 'string', description: 'Strong password' })
  password: string;

  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    description: 'User roles',
  })
  roles: string[];
}

@Controller()
class AppController {
  @ApiOperation({ summary: 'Get users' })
  @ApiOkResponse({ type: User })
  @Get('users')
  get(): User {
    const user = new User();
    user.id = 1;
    user.username = 'admin';
    user.password = 'admin';
    user.roles = ['admin'];
    return user;
  }
}

@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  Logger.log(`Application is running on: ${await app.getUrl()}`, 'Bootstap');
}

bootstrap();
