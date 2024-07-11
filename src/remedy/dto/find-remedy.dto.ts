import { IsInt, IsOptional, IsString } from 'class-validator';

export class FindRemedyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  category?: number;
}
