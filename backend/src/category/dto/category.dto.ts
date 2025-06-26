import { IsString, ValidateNested, ArrayNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { TermDto } from '../../term/dto/term.dto';

export class CategoryDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => TermDto)
  @ArrayNotEmpty()
  terms: TermDto[];
}
