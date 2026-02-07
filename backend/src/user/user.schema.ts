import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
export enum Role {
  admin,
  user,
}

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ require: true, unique: true })
  email: string;

  @Prop({ require: true })
  @Exclude()
  password: string;

  @Prop({ require: true })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

//hash password
UserSchema.pre('save', async function () {
  const user = this;
  if (!user.isModified('password')) return;
  try {
    user.password = await bcrypt.hash(user.password, 10);
  } catch (error) {
    throw error;
  }
});

//compare password
UserSchema.methods.comparePassword = async function (inputPassword: string) {
  const isMatched = await bcrypt.compare(inputPassword, this.password);
  if (!isMatched)
    throw new BadRequestException('email or password is not correct');
  return isMatched;
};
