import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersLogic } from './users.logic';

@Injectable()
export class UsersService {
  constructor(private userLogic: UsersLogic) {}

  async findOne(email: string): Promise<User | null> {
    return this.userLogic.findOne(email);
  }

  async create(email: string, password: string): Promise<User | null> {
    return this.userLogic.create(email, password);
  }
}
