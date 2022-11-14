import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthApiDataService } from './auth-api-data.service';

@Module({
  imports: [PrismaModule],
  providers: [AuthApiDataService],
  exports: [AuthApiDataService],
})
export class AuthApiDataModule {}
