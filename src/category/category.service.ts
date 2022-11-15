import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Category, CategoryOnApi } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCategory(categories: string[]) {
    return await Promise.all(
      categories.map(async (name) => {
        const value = name.toLowerCase().trim();
        return await this.prismaService.category.upsert({
          where: { name: value },
          update: {},
          create: { name: value },
        });
      }),
    );
  }

  async getCategoryApi(apiId: string, categories: string[]) {
    return await Promise.all(
      categories.map(async (e) => {
        const name = e.toLowerCase().trim();
        let data = await this.prismaService.categoryOnApi.findFirst({
          where: { api: { id: apiId }, category: { name } },
          include: { category: true },
        });
        if (data) return data;

        data = await this.prismaService.categoryOnApi.create({
          data: {
            category: {
              connectOrCreate: {
                create: { name },
                where: { name },
              },
            },
            api: {
              connect: {
                id: apiId,
              },
            },
          },
          include: {
            category: true,
          },
        });
        return data;
      }),
    );
  }

  async updateCategoryApi(
    apiId: string,
    categories: (CategoryOnApi & {
      category: Category;
    })[],
  ) {
    return await Promise.all(
      categories.map(async (e) => {
        const name = e.category.name.toLowerCase().trim();
        const categoryOnApi = await this.prismaService.categoryOnApi.findMany({
          where: { apiId },
        });
        await this.prismaService.categoryOnApi.deleteMany({
          where: { id: { in: categoryOnApi.map((e) => e.id) } },
        });
        return await this.prismaService.categoryOnApi.create({
          data: {
            category: {
              connect: {
                name,
              },
            },
            api: {
              connect: {
                id: apiId,
              },
            },
          },
        });
      }),
    );
  }
}
