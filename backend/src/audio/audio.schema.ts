import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Mongoose, Schema as MongooseSchema } from 'mongoose';
import { nanoid } from 'nanoid';
import { User } from 'src/user/user.schema';

@Schema({ timestamps: true })
export class Audio {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  publicId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  user: User;

  @Prop({
    required: true,
    unique: true,
    index: true,
    default: () => nanoid(10),
  })
  shortId: string;

  @Prop({ required: true, unique: true })
  secure_url: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  resource_type: string;
}

export type AudioDocument = HydratedDocument<Audio>;
export const AudioSchema = SchemaFactory.createForClass(Audio);
