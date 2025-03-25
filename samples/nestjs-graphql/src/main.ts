import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Resolver, Query } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Resolver(() => String)
export class ExampleResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }
}

export class UserResolver {
  @Query(() => String)
  user() {
    return {
      username: 'John Doe',
      email: '[email protected]',
    };
  }
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./samples/nestjs-graphql/graphql/**/*.{gql,graphql}'],
      playground: false,
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  providers: [ExampleResolver],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  await app.listen(3000);

  Logger.log(`🚀 Application is running on: ${await app.getUrl()}`, 'Bootstap');
}

bootstrap();
