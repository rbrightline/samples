import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class Role {
  @Prop({ type: String, maxlength: 30 }) name: string;
  @Prop({ type: String, maxlength: 100 }) description: string;
}

@Schema()
export class User {
  @Prop({ type: String }) username: string;
  @Prop([String]) tags: string[];
  @Prop([Role]) roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
