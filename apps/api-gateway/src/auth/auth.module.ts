import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_MICROSERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'auth',
                        brokers: [process.env.KAFKA_HOST]
                    },
                    producerOnlyMode: true,
                    consumer: {
                        groupId: 'auth-consumer'
                    }
                } 
            }
        ])
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
