import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TermDocument = Term & Document;

@Schema()
export class Term {
  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  to: string;
}

export const TermSchema = SchemaFactory.createForClass(Term);
