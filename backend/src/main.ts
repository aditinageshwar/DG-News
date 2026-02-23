import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CRITICAL: Enable CORS so your React app can talk to this API
  app.enableCors(); 
  await app.listen(3000);
}
bootstrap();