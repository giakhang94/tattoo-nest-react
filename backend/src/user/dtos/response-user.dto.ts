import { Exclude } from 'class-transformer';

export class ResponseUserDto {
  name: string;
  email: string;

  @Exclude()
  password: string;
}
