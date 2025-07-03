import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from '../../category/dto/category.dto';
import {
  Category,
  CategorySchema,
} from '../../category/schemas/category.schema';

export type CourseDocument = Course & Document;

@Schema()
class Language {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  originCountryCode?: string;

  @Prop({ required: false })
  iso_639_1_code?: string;
}

const LanguageSchema = SchemaFactory.createForClass(Language);

@Schema()
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: LanguageSchema, required: true })
  languageFrom: Language; // from

  @Prop({ type: LanguageSchema, required: true })
  languageTo: Language; // to

  @Prop({ type: [CategorySchema], required: true })
  categories: Category[] = [];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
