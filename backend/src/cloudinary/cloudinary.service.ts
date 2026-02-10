import { Injectable } from '@nestjs/common';
import { CloudinaryResponse } from './cloudinary-response';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    try {
      const result = await new Promise<CloudinaryResponse>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto' },
            (err, result) => {
              if (err) reject(err);
              resolve(result as CloudinaryResponse);
            },
          );
          streamifier.createReadStream(file.buffer).pipe(uploadStream);
        },
      );
      return result;
    } catch (error) {
      throw error;
    }
  }
}
