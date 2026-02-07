import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validate(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('user not found');
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      throw new BadRequestException('password or email is not correct');
    return user;
  }

  async login(body: any) {
    console.log(body);
  }
}
