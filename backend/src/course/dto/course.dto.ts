import { IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CategoryDto } from '../../category/dto/category.dto';

class CreateLanguageDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  originCountryCode?: string;

  @IsString()
  @IsOptional()
  iso_639_1_code?: string;
}

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @ValidateNested({ each: true })
  @Type(() => CreateLanguageDto)
  languageFrom: CreateLanguageDto;

  @ValidateNested({ each: true })
  @Type(() => CreateLanguageDto)
  languageTo: CreateLanguageDto;

  @IsOptional()
  @IsString()
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => CategoryDto)
  categories: CategoryDto[] = [];
}
