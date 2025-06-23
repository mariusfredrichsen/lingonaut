import { IsString } from 'class-validator';

export class TermDto {
  @IsString()
  from: string;

  @IsString()
  to: string;
}
