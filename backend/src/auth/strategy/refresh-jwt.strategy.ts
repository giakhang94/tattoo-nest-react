import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh_token',
) {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          console.log(req);
          return req.cookies['refresh_token'];
        },
      ]),
      secretOrKey: config.getOrThrow('JWT_REFRESH_SECRET'),
    });
  }
  async validate(payload: any) {
    return payload;
  }
}
