import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateAudioDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'tattoo name should have at least 3 characters' })
  name: string;
}
