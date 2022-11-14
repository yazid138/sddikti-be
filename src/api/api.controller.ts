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

@Controller('api-manager')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly categoryService: CategoryService,
  ) {}

  @Get()
  async getListApi() {
    return {
      data: await this.apiService.listApi(),
      message: 'Berhasil mengambil data Api',
    };
  }

  @Get(':id')
  async getDetailApi(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.apiService.detailApi({ id }),
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
        connect: categories.map((e) => ({ id: e.id })),
      },
    });

    return { code: 201, message: 'Berhasil menambah Api' };
  }

  @Auth(Role.ADMIN)
  @Put('update/:id')
  async updateAPI(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() apiDto: UpdateApiDto,
  ) {
    const data: Prisma.ApiUpdateInput = {
      name: apiDto.name && slug(apiDto.name),
      url: apiDto.url,
      author: apiDto.author,
      status: apiDto.status,
      description: apiDto.description,
    };

    // if (apiDto.categories) {
    //   const categories = await this.categoryService.getCategory(
    //     apiDto.categories,
    //   );
    //   data.categories = {
    //     set: categories.map((e) => ({ id: e.id })),
    //   };
    // }
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
