import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthApiDataService {
  constructor(private readonly prisma: PrismaService) {}

  async addApiAuthData(
    authApiId: string,
    datas: { name: string; value: string }[],
  ) {
    return await Promise.all(
      datas.map((e) =>
        this.prisma.authApiData.create({
          data: { authApiId, name: e.name, value: e.value },
        }),
      ),
    );
  }
}
