import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Audio, AudioDocument } from './audio.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AudioModule } from './audio.module';
import { CreateAudioDto } from './dtos/create-audio.dto';
import { UserPayload } from 'src/types/types';
import { nanoid } from 'nanoid';

@Injectable()
export class AudioService {
  constructor(
    @InjectModel(Audio.name) private audioModel: Model<AudioDocument>,
    private cloudinary: CloudinaryService,
  ) {}

  async uploadAudio(
    file: Express.Multer.File,
    body: CreateAudioDto,
    user: UserPayload,
  ) {
    const result = await this.cloudinary.uploadFile(file);
    const { public_id, secure_url, duration, resource_type } = result;
    const createDataWithRetry = async (attempt = 0) => {
      try {
        const shortId = nanoid(10);
        const audio = new this.audioModel({
          name: body.name,
          publicId: public_id,
          secure_url: secure_url,
          duration,
          resource_type,
          user: user.id,
          shortId,
        });
        await audio.save();
        return {
          id: audio.id,
          name: audio.name,
          shortId: audio.shortId,
          secure_url: audio.secure_url,
          duration: audio.duration,
        };
      } catch (error) {
        if (error.code === 11000 && attempt < 5) {
          console.warn(`Trung ShortID, dang thu lai lan ${attempt + 1}...`);
          return createDataWithRetry(attempt + 1);
        }
      }
    };
    return createDataWithRetry();
  }
}
