import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

enum StatusApi {
  aktif = 'aktif',
  tidakAktif = 'tidakAktif',
}

export class AddApiDto {
  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  author: string;

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
  @IsEnum(StatusApi)
  status?: StatusApi;

  @IsOptional()
  @IsArray()
  categories?: string[];
}
