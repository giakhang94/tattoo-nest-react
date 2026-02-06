import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dtos/create-user.dto';
import { HidePassword } from 'src/interceptors/hidePassword.interceptor';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('')
  @UseInterceptors(HidePassword)
  createUser(@Body() body: createUserDto) {
    return this.userService.createUser(body);
  }

  @Get('')
  @UseInterceptors(HidePassword)
  getAllUser() {
    return this.userService.getAllUser();
  }
}
