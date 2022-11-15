import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Api, Prisma } from '@prisma/client';

@Injectable()
export class ApiService {
  constructor(private readonly prismaService: PrismaService) {}

  async listApi(where?: Prisma.ApiWhereInput) {
    return await this.prismaService.api.findMany({
      where,
      include: { categories: { include: { category: true } } },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async detailApi(where: Prisma.ApiWhereUniqueInput) {
    const data = await this.prismaService.api.findUniqueOrThrow({
      where,
      include: {
        categories: { include: { category: true } },
        auth: { include: { data: true } },
        query: true,
      },
    });
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
  ) {
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
