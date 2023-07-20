import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalExceptionFilterFilter } from './global-exception/global-exception.filter';
import { PrismaClientExceptionFilter } from './prisma-exception/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  app.useGlobalFilters(
    new GlobalExceptionFilterFilter(app.get(HttpAdapterHost)),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const messages = errors.reduce((acc: string[], error) => {
          acc.push(...Object.values(error.constraints));
          return acc;
        }, []);
        console.log(messages);
        return new BadRequestException(messages);
      },
    }),
  );

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // app.useGlobalFilters(new PrismaClientExceptionFilter(app.getHttpAdapter()));

  await app.listen(3000);
}

bootstrap();
