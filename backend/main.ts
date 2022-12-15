import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.setGlobalPrefix('/api');
  await app.listen(4000);

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
  //res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });

  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });
}
bootstrap();
