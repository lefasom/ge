import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';
const PORT = 3000
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    // Opcional: Configurar otras opciones de CORS según tus necesidades
    // Por ejemplo:
    // methods: ['GET', 'POST'], // Métodos HTTP permitidos
    // allowedHeaders: ['Authorization'], // Cabeceras permitidas
    // exposedHeaders: ['Authorization'], // Cabeceras expuestas al cliente
    // ...
  });
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Documentation Example')
    .setDescription('Aprendiendo a documentar')
    .setVersion('1.0')
    .addTag('items - 1')
    .addTag('items - 1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // habilito el uso de pipes osea de validaciones 
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);

  console.log(`http://localhost:${PORT}`)

}
bootstrap();
// archivo raiz