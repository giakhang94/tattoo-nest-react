import {
  IsEmail,
  IsNotEmpty,
  min,
  MinLength,
  minLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
