import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { isEmail } from 'validator';

@Schema()
export class User {
  @Prop({
    minlength: 5,
    required: [true, 'Name is a required field!'],
    trim: true,
  })
    name: string;

  @Prop({
    minlength: 5,
    required: [true, 'Name is a required field!'],
    trim: true,
  })
    username: string;

  @Prop({
    validate: [isEmail, 'Email must be a valid one!']
  })
    email: string;

  @Prop({
    minlength: 6,
    required: [true, 'Password is a required field!'],
    trim: true
  })
    password: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
