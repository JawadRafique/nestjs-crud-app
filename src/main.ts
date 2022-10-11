import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(5000).then(() => console.log("App is running on port 5000")).catch((err) => console.log(err));
}
bootstrap();
