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
  UseGuards,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { AddApiDto, UpdateApiDto } from './api.dto';
import { Prisma } from '@prisma/client';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/utils/constants';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('add')
  async addAPI(@Body() apiDto: AddApiDto) {
    const categories = await this.categoryService.getCategory(
      apiDto.categories,
    );

    const data = await this.apiService.addAPI({
      url: apiDto.url,
      author: apiDto.author,
      description: apiDto.description,
      categories: {
        connect: categories.map((e) => ({ id: e.id })),
      },
    });

    return { code: 201, message: 'Berhasil menambah Api', data };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('update/:id')
  async updateAPI(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() apiDto: UpdateApiDto,
  ) {
    const data: Prisma.ApiUpdateInput = {
      url: apiDto.url,
      author: apiDto.author,
      status: apiDto.status,
      description: apiDto.description,
    };

    if (apiDto.categories) {
      const categories = await this.categoryService.getCategory(
        apiDto.categories,
      );
      data.categories = {
        set: categories.map((e) => ({ id: e.id })),
      };
    }

    return {
      message: 'Berhasil mengubah Api',
      data: await this.apiService.updateAPI({ id }, data),
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('delete/:id')
  async deleteApi(@Param('id', ParseUUIDPipe) id: string) {
    await this.apiService.deleteApi({ id });
    return { message: 'Berhasil menghapus Api' };
  }
}
