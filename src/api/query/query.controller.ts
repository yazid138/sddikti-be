import { Controller, Post, Body } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/utils/constants';
import { AddQueryDto } from './query.dto';
import { QueryService } from './query.service';

@Controller('api-manager/query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Auth(Role.ADMIN)
  @Post('add')
  async addQuery(@Body() queryDto: AddQueryDto) {
    await this.queryService.addQuery(queryDto.api_id, queryDto.query);
    return { code: HttpStatus.CREATED, message: 'Berhasil menambah query' };
  }
}
