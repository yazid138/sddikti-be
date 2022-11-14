import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthApiService {
  constructor(private readonly prisma: PrismaService) {}

  async createAuthApi(data: Prisma.AuthApiCreateInput) {
    return await this.prisma.authApi.create({ data });
  }
}
