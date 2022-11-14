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
import { IsApiAuthDataNameExists } from 'src/common/validation/api-auth-data-name-exists';
import { IsExists } from 'src/common/validation/exists-validator';

class AuthData {
  @IsNotEmpty()
  @IsString()
  @IsApiAuthDataNameExists()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class AddAuthApiDTO {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @IsExists('api', 'id')
  api_id: string;

  @IsNotEmpty()
  @IsString()
  auth_type: string;

  @ArrayNotEmpty()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AuthData)
  data: AuthData[];
}
