import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { create } from 'domain';

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

  async getCategoryApi(apiId: string, categories: Category[]) {
    return await Promise.all(
      categories.map(async (data) => {
        const value = data.name.toLowerCase().trim();
        return await this.prismaService.categoryApi.findFirst({
          where: { category: { name: value }, api: { id: apiId } },
          include: { category: true },
        });
      }),
    );
  }
}
