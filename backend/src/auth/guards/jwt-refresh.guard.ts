import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class RefreshJwtGuard extends AuthGuard('refresh_token') {
  handleRequest(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (!user || err) {
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Expired refresh token');
      }
      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid refresh token');
      }
      throw new UnauthorizedException('please login to continue');
    }
    return user;
  }
}
