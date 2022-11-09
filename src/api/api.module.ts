import { CategoryModule } from './../category/category.module';
import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { QueryModule } from 'src/api/query/query.module';

@Module({
  imports: [PrismaModule, CategoryModule, QueryModule],
  providers: [ApiService],
  controllers: [ApiController],
  exports: [ApiService],
})
export class ApiModule {}
