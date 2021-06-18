import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema';
import * as mongoose from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ strict: false, collection: 'tax_download' })
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  username: User;

  @Prop()
  description: string;

  @Prop()
  title: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
