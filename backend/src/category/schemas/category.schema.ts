import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Term, TermSchema } from '../../term/schemas/term.schema';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [TermSchema], required: true })
  terms: Term[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
