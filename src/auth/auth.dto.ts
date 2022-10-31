import { IsNotEmpty, IsEnum } from 'class-validator';
import { IsExistsUser } from 'src/common/validation/user-exists-validator';
import { Role } from '../utils/constants';

export class UserRegisterDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsExistsUser(['username'])
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export class UserLoginDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
