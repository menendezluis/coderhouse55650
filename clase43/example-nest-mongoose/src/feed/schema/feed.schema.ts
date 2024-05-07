import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeedDocument = HydratedDocument<Feed>;

@Schema()
export class Feed {
  @Prop({ required: true })
  userId: string;
  @Prop({ required: true })
  message: string;
}

export const FeedSchema = SchemaFactory.createForClass(Feed);
