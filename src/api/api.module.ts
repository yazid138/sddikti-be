import { CategoryModule } from './../category/category.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

@Module({
  imports: [PrismaModule, CategoryModule],
  providers: [ApiService],
  controllers: [ApiController],
})
export class ApiModule {}
