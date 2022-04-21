import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorExceptionMapping } from './common/filters/error-mapping.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const reflector = app.get(Reflector);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorExceptionMapping(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Bug Tracker')
    .setDescription(
      'Record, report, and monitor the bugs in a software development project',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableShutdownHooks();

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
