import { CategoryService } from './../category/category.service';
import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { AddApiDto, UpdateApiDto } from './api.dto';
import { Prisma } from '@prisma/client';

@Controller('api-manager')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  async getListApi() {
    const data = await this.apiService.listApi();
    return { data, message: 'Berhasil mengambil data Api' };
  }

  @Post('add')
  async addAPI(@Body() apiDto: AddApiDto) {
    const categories = await this.categoryService.getCategory(
      apiDto.categories,
    );

    const data = await this.apiService.addAPI({
      url: apiDto.url,
      author: apiDto.author,
      categories: {
        connect: categories.map((e) => ({ id: e.id })),
      },
    });

    return { code: 201, message: 'Berhasil menambah Api', data };
  }

  @Put('update/:id')
  async updateAPI(@Param('id') id, @Body() apiDto: UpdateApiDto) {
    const data: Prisma.ApiUpdateInput = {
      url: apiDto.url,
      author: apiDto.author,
      status: apiDto.status,
    };

    if (apiDto.categories) {
      const categories = await this.categoryService.getCategory(
        apiDto.categories,
      );
      data.categories = {
        set: categories.map((e) => ({ id: e.id })),
      };
    }

    const api = await this.apiService.updateAPI({ id }, data);

    return { message: 'Berhasil mengubah Api', data: api };
  }
}
