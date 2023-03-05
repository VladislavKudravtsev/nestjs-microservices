import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client';
import { MakePaymentDto } from '@nestjs-microservices/shared/dto'
import { User } from '@nestjs-microservices/shared/entities';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject("AUTH_MICROSERVICE") private readonly authClient: ClientKafka
  ) {}

  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    this.authClient.send('get_user', JSON.stringify({ userId }))
      .subscribe((user: User) => {
        Logger.log(`process payment: ${user.name} - ${amount}`);
      })
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }

  getData(): { message: string } {
    return { message: 'Welcome to payments-microservice!' };
  }
}
