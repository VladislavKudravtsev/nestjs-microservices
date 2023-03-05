import { Injectable, Logger } from "@nestjs/common";
import { User } from '@nestjs-microservices/shared/entities'

@Injectable()
export class UserRepository {
    private readonly users: User[] = [];

    save(user: User) {
        this.users.push({ ...user, id: this.users.length + 1 });
        Logger.log(`USER SAVED ${user}`)
    }

    findOne(id: number) {
        return this.users.find(user => user.id === id)
    }
}