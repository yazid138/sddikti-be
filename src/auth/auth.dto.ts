import { IsNotEmpty, IsEnum, IsEmail } from 'class-validator';
import { IsUnique } from 'src/common/validation/unique-validator';
import { Role } from '../utils/constants';

export class UserRegisterDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUnique('user', 'email')
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
