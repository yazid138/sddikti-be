import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QueryService } from './query.service';
import { QueryController } from './query.controller';

@Module({
  imports: [PrismaModule],
  providers: [QueryService],
  controllers: [QueryController],
  exports: [QueryService],
})
export class QueryModule {}
