import { ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@nestjs-microservices/shared/dto'

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @EventPattern('create_user')
  handleUserCreate(@Payload(ValidationPipe) data: CreateUserDto) {
    this.appService.createUser(data);
  }

  @MessagePattern('get_user')
  handlerGetUser(@Payload('userId', ParseIntPipe)  userId: number) {
    return this.appService.getUser(userId);
  }
}
