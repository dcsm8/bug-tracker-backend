import { ClassSerializerInterceptor } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ErrorExceptionMapping } from './common/filters/error-mapping.filter';
import { setupSwagger } from './common/utils/setup-swagger';
import { setupValidationPipe } from './common/utils/setup-validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(setupValidationPipe());

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ErrorExceptionMapping(httpAdapter));

  app.enableShutdownHooks();
  setupSwagger(app);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
