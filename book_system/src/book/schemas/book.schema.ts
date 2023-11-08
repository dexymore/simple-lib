import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Category {
  FICTION = 'fiction',
  NONFICTION = 'nonfiction',
  SCIENCE = 'science',
  HISTORY = 'history',
  BIOGRAPHY = 'biography',
}

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publishedDate: Date;

  @Prop({ required: true })
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
