import { IsNotEmpty, IsEnum, IsEmail } from 'class-validator';
import { IsUserExists } from 'src/common/validation/user-exists-validator';
import { Role } from '../utils/constants';

export class UserRegisterDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUserExists(['email'])
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
