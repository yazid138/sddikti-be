import { IsNotEmpty, IsEnum } from 'class-validator';
// import { Role } from '../utils/constants';

export enum Role {
  ADMIN = 'ADMIN',
  DIRECTOR = 'DIRECTOR',
  HEAD_DIVISION = 'HEAD_DIVISION',
  STAFF = 'STAFF',
  USER = 'USER',
}

export class UserRegisterDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
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
