import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCategory(categories: string[]): Promise<Category[]> {
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
}
