import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, QueryApi } from '@prisma/client';

@Injectable()
export class QueryService {
  constructor(private readonly prismaService: PrismaService) {}

  async addQuery(
    apiId: string,
    queries: { name: string; type: string }[],
  ): Promise<QueryApi[]> {
    return await Promise.all(
      queries.map((e) =>
        this.prismaService.queryApi.create({
          data: { apiId, name: e.name, type: e.type },
        }),
      ),
    );
  }

  async getQueryApi(where: Prisma.QueryApiWhereInput): Promise<QueryApi[]> {
    return await this.prismaService.queryApi.findMany({ where });
  }
}
