import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersLogic } from './users.logic';
import { UserProfile } from './models/UserProfile';

@Injectable()
export class UsersService {
  constructor(private userLogic: UsersLogic) {}

  async findOne(email: string): Promise<User | null> {
    return this.userLogic.findOne(email);
  }

  async create(
    email: string,
    password: string,
    name: string,
    surname: string,
  ): Promise<User | null> {
    return this.userLogic.create(email, password, name, surname);
  }

  async getProfileByEmail(email: string): Promise<UserProfile | null> {
    return this.userLogic.getProfileByEmail(email);
  }
}
