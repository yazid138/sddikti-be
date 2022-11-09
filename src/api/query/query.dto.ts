import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { IsNameQueryExists } from 'src/common/validation/query-name-exists-validator';

export class Query {
  @IsNotEmpty()
  @IsString()
  @IsNameQueryExists()
  name: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}

export class AddQueryDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  api_id: string;

  @ArrayNotEmpty()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Query)
  query: Query[];
}
