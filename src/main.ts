import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { microserviceOptions } from './utils/microservice-connection';

const logger = new Logger('CustomerMicroservice');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  await app.listen().then(() => {
    logger.log('Microservice is listening');
  });
}
bootstrap();
