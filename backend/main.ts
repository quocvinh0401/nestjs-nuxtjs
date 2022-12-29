import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express'
import { v2 as cloudinary } from 'cloudinary'

const fileUpload = require('express-fileupload')

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.setGlobalPrefix('/api');
  await app.listen(4000);

  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
  //   // res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });

  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  })
  app.use(json())
  app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 2024 * 1024}
  }))
}
bootstrap();
