import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:8100',
      'http://localhost:8200',
    ],
    credentials: true,
  });
  await app.listen(5000, () => {
    console.log('Listening on port:5000');
  });
}
bootstrap();

process.on('uncaughtException', function (err) {
  console.error('Caught exception: ', err);
});
process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', error);
});
