import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Role, Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async getOneRole(where: Prisma.RoleWhereUniqueInput): Promise<Role> {
    return await this.prisma.role.findUnique({ where });
  }

  async getRole(where?: Prisma.RoleWhereInput): Promise<Role[]> {
    return await this.prisma.role.findMany({ where });
  }
}
