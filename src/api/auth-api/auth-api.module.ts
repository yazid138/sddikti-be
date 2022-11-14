import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthApiService } from './auth-api.service';
import { AuthApiDataModule } from './auth-api-data/auth-api-data.module';
import { AuthApiController } from './auth-api.controller';

@Module({
  imports: [PrismaModule, AuthApiDataModule],
  providers: [AuthApiService],
  exports: [AuthApiService],
  controllers: [AuthApiController],
})
export class AuthApiModule {}
