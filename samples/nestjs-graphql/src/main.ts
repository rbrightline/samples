import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Args, GraphQLModule, Mutation, Subscription } from '@nestjs/graphql';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Resolver, Query } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => String)
export class HelloResolver {
  @Query(() => String)
  hello(): string {
    return 'Hello World!';
  }
}

type User = Record<string, any>;

@Resolver('User')
export class UserResolver {
  private users: User[] = [];

  @Query('getUser')
  getUser(@Args('id') id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  @Query('getAllUsers')
  getAllUsers(): User[] {
    return this.users;
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: any): Promise<User> {
    const newUser = {
      id: Date.now().toString(),
      username: input.username,
    };
    this.users.push(newUser);

    await pubSub.publish('userAdded', { userAdded: newUser });
    return newUser;
  }

  @Mutation('deleteUser')
  deleteUser(@Args('id') id: string): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);
    return this.users.length < initialLength;
  }

  @Subscription('userAdded')
  userAdded() {
    return pubSub.asyncIterableIterator('userAdded');
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
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [HelloResolver, UserResolver],
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
