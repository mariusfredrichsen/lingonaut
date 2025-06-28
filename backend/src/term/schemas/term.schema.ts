import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TermDocument = Term & Document;

@Schema()
export class Term {
  @Prop({ required: true })
  termFrom: string;

  @Prop({ required: true })
  termTo: string;

  @Prop({ required: false })
  notes?: string;
}

export const TermSchema = SchemaFactory.createForClass(Term);
