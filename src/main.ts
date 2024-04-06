import {
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';
import { ValidationErrsFilter } from './common/filters/error-validation.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost:5173'],
      credentials: true,
    },
    logger: ['error', 'debug', 'warn', 'fatal'],
    // httpsOptions: {
    // 	cert: readFileSync("/home/ra0_0d/.dotFiles/ssls/localhost.crt", "utf8"),
    // 	key: readFileSync("/home/ra0_0d/.dotFiles/ssls/localhost.key", "utf8"),
    // },
  });
  app.use(cookieParser());
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  );
  app.useGlobalFilters(
    new ValidationErrsFilter(),
    new DatabaseExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      enableDebugMessages: true,
      errorHttpStatusCode: 422,
      exceptionFactory: (errors: ValidationError[]) => {
        const errorMessages = errors.map((err) => {
          return {
            [err.property]: Object.values(err.constraints)[0],
          };
        });
        return new UnprocessableEntityException(errorMessages, {});
      },
    }),
  );
  // const config = new DocumentBuilder()
  // 	.setTitle("Education example")
  // 	.setDescription("The cats API description")
  // 	.setVersion("1.0")
  // 	.addTag("cats")
  // 	.build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup("api", app, document);
  //
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), {
    prefix: '/uploads/',
  });
  await app.listen(3000);
}
bootstrap();
