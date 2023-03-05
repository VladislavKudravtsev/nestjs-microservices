import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from '@nestjs-microservices/shared/dto';

@Injectable()
export class AppService {

  constructor(private readonly userRepository: UserRepository) {}
    
  getData(): { message: string } {
    return { message: 'Welcome to auth-microservice!' };
  }

  createUser(data: CreateUserDto) {
    this.userRepository.save(data);
  }

  getUser(id: number) {
    return this.userRepository.findOne(id)
  }
}
