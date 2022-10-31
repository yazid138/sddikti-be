import { IsNotEmpty, IsEnum } from 'class-validator';
import { IsUserExists } from 'src/common/validation/user-exists-validator';
import { Role } from '../utils/constants';

export class UserRegisterDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsUserExists(['username'])
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
