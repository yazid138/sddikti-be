import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { configValidationSchema } from './config/config.schema';
import { TerminusModule } from '@nestjs/terminus';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';
import { ApiModule } from './api/api.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserExistsValidator } from './common/validation/user-exists-validator';
import { ApiNameExists } from './common/validation/api-name-exists';
import { QueryNameExistsValidator } from './common/validation/query-name-exists-validator';
import { QueryModule } from './api/query/query.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
    }),
    HttpModule,
    TerminusModule,
    PrismaModule,
    AuthModule,
    UserModule,
    RoleModule,
    CategoryModule,
    ApiModule,
    QueryModule,
  ],
  controllers: [AppController],
  providers: [UserExistsValidator, ApiNameExists, QueryNameExistsValidator],
})
export class AppModule {}
