import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { createUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(body: createUserDto) {
    const { email } = body;
    const isExistingUser = await this.userModel.findOne({ email });
    if (isExistingUser) {
      throw new BadRequestException('Email has been used');
    }
    const newUser = new this.userModel(body);
    return newUser.save();
  }

  async getAllUser() {
    return this.userModel.find();
  }
}
