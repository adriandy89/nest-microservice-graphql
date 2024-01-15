import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RabbitMQ } from 'libs/common/constants/rabbitmq.constants';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appConfig = await NestFactory.create(AuthModule);
  const configService = appConfig.get(ConfigService);
  const amqpUrl = configService.get('AMQP_URL');
  // You don't pass AppModule anymore
  const app = appConfig.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [amqpUrl],
      queue: RabbitMQ.AccessControlQueue,
    },
  });
  await app.listen();
  console.log('Microservice Auth is listening');
}
bootstrap();
