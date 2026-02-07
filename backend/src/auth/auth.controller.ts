import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/Local.guard';
import { LoginDto } from './dtos/login.dto';
import { Request, Response } from 'express';
import { GetCurrentUser } from './decorators/GetCurrenUser.decorator';
import { UserDocument } from 'src/user/user.schema';

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
}
