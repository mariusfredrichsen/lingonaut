import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from '../../category/dto/category.dto';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories?: CategoryDto[];
}
