import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class createUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  password: string;
}
