import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('BOOKSHELF-API')
    .setDescription('Ini adalah BOOKSHELF API')
    .setVersion('1.0')
    .addTag('End Point')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap().then(() => {
  console.log(`server is running on port ${process.env.APP_PORT || 3000}`);
});
