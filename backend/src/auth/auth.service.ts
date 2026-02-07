import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('user not found');
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched)
      throw new BadRequestException('password or email is not correct');
    return user;
  }

  async login(user: UserDocument, response: Response) {
    const { id, role } = user;
    const payload = { id, role };
    const token = this.jwt.sign(payload);
    response.cookie('authentication_token', token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + this.config.getOrThrow('JWT_EXP') * 1000),
    });
    return { message: 'login successfully' };
  }
}
