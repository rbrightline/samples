import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import { UserContnroller } from './user/user.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/testdb'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserContnroller],
})
export class AppModule {}
