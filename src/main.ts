import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
// import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { useContainer } from 'class-validator';
import { requestContextMiddleware } from '@medibloc/nestjs-request-context';
import { MyContext } from './common/context/my-context';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication');

  // Config Service
  const configService = app.get(ConfigService);

  // Compression
  app.use(compression());

  // Enable Helmet
  app.use(helmet());

  // Enable Cookie-Parser
  app.use(cookieParser());

  // set CORS
  app.enableCors();

  // // Enable CSRF
  // app.use(csurf());

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  // Enable Auto Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // Enable Context
  app.use(requestContextMiddleware(MyContext));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Global Interceptors
  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  // Global Filters
  app.useGlobalFilters(new HttpExceptionFilter(), new PrismaExceptionFilter());

  await app.listen(parseInt(configService.get('PORT', '3000'), 10));
  logger.verbose(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
