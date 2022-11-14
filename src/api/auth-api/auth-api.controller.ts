import { AuthApiService } from './auth-api.service';
import { Controller, Post, Body } from '@nestjs/common';
import { AddAuthApiDTO } from './auth-api.dto';
import { AuthApiDataService } from './auth-api-data/auth-api-data.service';

@Controller('api-manager/auth')
export class AuthApiController {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly authApiDataService: AuthApiDataService,
  ) {}

  @Post('add')
  async addAuthApi(@Body() authApiDto: AddAuthApiDTO) {
    const authApi = await this.authApiService.createAuthApi({
      type: authApiDto.auth_type,
      api: { connect: { id: authApiDto.api_id } },
    });

    await this.authApiDataService.addApiAuthData(authApi.id, authApiDto.data);

    return { message: 'berhasil menambah Auth API' };
  }
}
