import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

enum StatusApi {
  AKTIF = 'AKTIF',
  TIDAK_AKTIF = 'TIDAK_AKTIF',
}

export class AddApiDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsArray()
  categories: string[];
}

export class UpdateApiDto {
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(StatusApi)
  status?: StatusApi;

  @IsOptional()
  @IsArray()
  categories?: string[];
}
