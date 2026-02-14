import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AudioService } from './audio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { GetCurrentUser } from 'src/auth/decorators/GetCurrenUser.decorator';
import { UserPayload } from 'src/types/types';
import { CreateAudioDto } from './dtos/create-audio.dto';

@Controller('audio')
export class AudioController {
  constructor(private audioService: AudioService) {}

  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('audio'))
  uploadAudio(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10 * 1024 * 1024,
          }),
          new FileTypeValidator({
            fileType: /(mp3|wav|ogg|m4a)$/i,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @GetCurrentUser() user: UserPayload,
    @Body() body: CreateAudioDto,
  ) {
    return this.audioService.uploadAudio(file, body, user);
  }
}
