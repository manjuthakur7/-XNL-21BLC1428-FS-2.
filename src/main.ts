// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors();

//   const config = new DocumentBuilder()
//     .setTitle('Health & Fitness Tracker API')
//     .setDescription('API documentation for the Health & Fitness Tracker')
//     .setVersion('1.0')
//     .addBearerAuth()
//     .build();
  
//   const document = SwaggerModule.createDocument(app, config);
//   SwaggerModule.setup('api-docs', app, document);

//   await app.listen(process.env.PORT || 3000);

// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable WebSocket Adapter
  app.useWebSocketAdapter(new IoAdapter(app));

  // Enable CORS for frontend communication
  app.enableCors({
    origin: 'http://localhost:3001/', // Change this to your frontend URL (e.g., 'http://localhost:5173')
    methods: ['GET', 'POST'],
  });

  await app.listen(3000);
  console.log(`Server running on http://localhost:3001`);
}
bootstrap();


