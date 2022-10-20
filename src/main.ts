import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor())

  // :method :url :status :res[content-length] - :response-time ms => morgan log
  app.use(morgan('tiny'));
  await app.listen(5000).then(() => console.log("App is running on port 5000")).catch((err) => console.log(err));
}
bootstrap();
