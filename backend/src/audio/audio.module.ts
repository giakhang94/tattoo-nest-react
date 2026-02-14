import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Audio, AudioSchema } from './audio.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [AudioService],
  controllers: [AudioController],
  imports: [
    MongooseModule.forFeature([{ name: Audio.name, schema: AudioSchema }]),
    CloudinaryModule,
    AuthModule,
  ],
})
export class AudioModule {}
