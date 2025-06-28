import { IsOptional, IsString } from 'class-validator';

export class TermDto {
  @IsString()
  termFrom: string;

  @IsString()
  termTo: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
