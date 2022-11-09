import { SetMetadata } from '@nestjs/common';
import { applyDecorators, UseGuards } from '@nestjs/common/decorators';
import { Role } from 'src/utils/constants';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { RolesGuard } from '../guard/roles.guard';

export const ROLES_KEY = 'roles';
export const Auth = (...args: Role[]) => {
  return applyDecorators(
    SetMetadata(ROLES_KEY, args),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
};
