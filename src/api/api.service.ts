import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Api, Category, Prisma } from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private readonly prismaService: PrismaService) {}

  async listApi(where?: Prisma.ApiWhereInput): Promise<Api[]> {
    return await this.prismaService.api.findMany({
      where,
      include: { categories: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async detailApi(
    where: Prisma.ApiWhereUniqueInput,
  ): Promise<Api & { categories: Category[] }> {
    const data = await this.prismaService.api.findUnique({
      where,
      include: {
        categories: true,
        auth: { include: { data: true } },
        query: true,
      },
    });
    if (!data) {
      throw new NotFoundException();
    }
    return data;
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
    });
  }

  async deleteApi(where: Prisma.ApiWhereUniqueInput): Promise<Api> {
    return await this.prismaService.api.delete({
      where,
    });
  }
}
