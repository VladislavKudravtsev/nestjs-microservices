import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PAYMENT_MICROSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment',
            brokers: [process.env.KAFKA_HOST]
          },
          consumer: {
            groupId: 'payment-consumer'
          }
        }
      }
    ])
  ],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
