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
export class Course {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: [CategorySchema], required: true })
  categories?: Category[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
