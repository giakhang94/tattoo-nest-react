import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/Local.guard';
import { LoginDto } from './dtos/login.dto';
import { Request, Response } from 'express';
import { GetCurrentUser } from './decorators/GetCurrenUser.decorator';
import { UserDocument } from 'src/user/user.schema';
import { JwtGuard } from './guards/jwt.guard';
import { RefreshJwtGuard } from './guards/jwt-refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('login')
  login(
    @Res({ passthrough: true }) response: Response,
    @GetCurrentUser() user: UserDocument,
  ) {
    return this.authService.login(user, response);
  }

  @Get('me')
  @UseGuards(JwtGuard) //access token
  getMe(@GetCurrentUser() user: UserDocument) {
    return user;
  }

  //request to renew the access token
  @Get('refresh-token')
  @UseGuards(RefreshJwtGuard)
  refreshToken(
    @Res({ passthrough: true }) response: Response,
    @GetCurrentUser() user: UserDocument,
  ) {
    return this.authService.refreshToken(response, user);
  }

  @Get('logout')
  @UseGuards(RefreshJwtGuard)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
