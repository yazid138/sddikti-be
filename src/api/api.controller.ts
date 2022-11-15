import { CategoryService } from './../category/category.service';
import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { AddApiDto, UpdateApiDto } from './api.dto';
import { Prisma } from '@prisma/client';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/utils/constants';
import * as slug from 'slug';
import { NotFoundException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('api-manager')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  async getListApi() {
    const data = await this.apiService.listApi();
    return {
      data: data.map((e) => ({
        ...e,
        categories: e.categories.map((e) => ({ ...e.category })),
      })),
      message: 'Berhasil mengambil data Api',
    };
  }

  @Get(':id')
  async getDetailApi(@Param('id', ParseUUIDPipe) id: string) {
    const data: any = await this.apiService.detailApi({ id });
    data.categories = data.categories.map((e) => ({ ...e.category }));
    return {
      data,
      message: 'Berhasil mengambil detail data Api',
    };
  }

  @Auth(Role.ADMIN)
  @Post('add')
  async addAPI(@Body() apiDto: AddApiDto) {
    const categories = await this.categoryService.getCategory(
      apiDto.categories,
    );
    await this.apiService.addAPI({
      name: slug(apiDto.name),
      url: apiDto.url,
      author: apiDto.author,
      description: apiDto.description,
      categories: {
        create: categories.map((e) => ({ categoryId: e.id })),
      },
    });

    return { code: HttpStatus.CREATED, message: 'Berhasil menambah Api' };
  }

  @Auth(Role.ADMIN)
  @Put('update/:id')
  async updateAPI(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() apiDto: UpdateApiDto,
  ) {
    const api = await this.apiService.detailApi({ id });
    if (!api) throw new NotFoundException();

    const data: Prisma.ApiUpdateInput = {
      name: apiDto.name && slug(apiDto.name),
      url: apiDto.url,
      author: apiDto.author,
      status: apiDto.status,
      description: apiDto.description,
    };

    if (apiDto.categories) {
      const categories = await this.categoryService.getCategoryApi(
        api.id,
        apiDto.categories,
      );
      await this.categoryService.updateCategoryApi(api.id, categories);
    }
    await this.apiService.updateAPI({ id }, data);
    return {
      message: 'Berhasil mengubah Api',
    };
  }

  @Auth(Role.ADMIN)
  @Delete('delete/:id')
  async deleteApi(@Param('id', ParseUUIDPipe) id: string) {
    await this.apiService.deleteApi({ id });
    return { message: 'Berhasil menghapus Api' };
  }
}
