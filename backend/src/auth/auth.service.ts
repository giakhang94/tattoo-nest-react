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
import { attachCookie } from './utils/attachCookie';
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
    const accessPayload = { id, role, type: 'access_token' };
    const token = this.jwt.sign(accessPayload);
    attachCookie(
      response,
      'authentication_token',
      token,
      this.config.getOrThrow('JWT_EXP'),
    );
    //refresh token
    const refreshPayload = { id, role, type: 'refresh_token' };
    const refreshToken = this.jwt.sign(refreshPayload, {
      expiresIn:
        this.config.getOrThrow('JWT_REFRESH_EXP') +
        this.config.getOrThrow('JWT_REFRESH_UNIT'),
      secret: this.config.getOrThrow('JWT_REFRESH_SECRET'),
    });
    attachCookie(
      response,
      'refresh_token',
      refreshToken,
      this.config.getOrThrow('JWT_REFRESH_EXP'),
    );
    return { message: 'login successfully' };
  }

  async refreshToken(response: Response, user: UserDocument) {
    const { id, role } = user;
    const authentication_token = this.jwt.sign({
      id,
      role,
      type: 'access_token',
    });

    attachCookie(
      response,
      'authentication_token',
      authentication_token,
      this.config.getOrThrow('JWT_EXP'),
    );
    return { message: 'token refreshed' };
  }

  async logout(response: Response) {
    attachCookie(response, 'authentication_token', '', 0);
    attachCookie(response, 'refresh_token', '', 0);

    return { message: 'logout successfully' };
  }
}
