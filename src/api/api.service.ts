import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Api, Category, Prisma } from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private readonly prismaService: PrismaService) {}

  async listApi(where?: Prisma.ApiWhereInput): Promise<Api[]> {
    return await this.prismaService.api.findMany({
      where,
      include: { categories: true },
    });
  }

  async detailApi(
    where: Prisma.ApiWhereUniqueInput,
  ): Promise<Api & { categories: Category[] }> {
    return await this.prismaService.api.findUnique({
      where,
      include: { categories: true },
    });
  }

  async addAPI(data: Prisma.ApiCreateInput): Promise<Api> {
    return await this.prismaService.api.create({
      data,
      include: { categories: true },
    });
  }

  async updateAPI(
    where: Prisma.ApiWhereUniqueInput,
    data: Prisma.ApiUpdateInput,
  ): Promise<Api> {
    data.updatedAt = new Date();
    return await this.prismaService.api.update({
      where,
      data,
      include: { categories: true },
    });
  }
}
