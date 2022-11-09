import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ArrayNotEmpty,
} from 'class-validator';
import { IsNameApiExists } from 'src/common/validation/api-name-exists';

enum StatusApi {
  AKTIF = 'AKTIF',
  TIDAK_AKTIF = 'TIDAK_AKTIF',
}

export class AddApiDto {
  @IsNotEmpty()
  @IsString()
  @IsNameApiExists()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ArrayNotEmpty()
  @IsArray()
  categories: string[];
}

export class UpdateApiDto {
  @IsOptional()
  @IsString()
  @IsNameApiExists()
  name?: string;

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
