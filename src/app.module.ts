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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';

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
  ],
  controllers: [AppController],
  providers: [UserExistsValidator],
})
export class AppModule {}
