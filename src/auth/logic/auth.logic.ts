import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthLogic {
  constructor(private readonly usersService: UsersService) {}

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    if (user?.password !== password) {
      throw new UnauthorizedException('wrong password');
    }

    return user;
  }

  async register(
    email: string,
    password: string,
    name: string,
    surname: string,
  ): Promise<User | null> {
    const user = await this.usersService.create(email, password, name, surname);
    if (!user) {
      throw new UnauthorizedException('error registering a new user');
    }
    return user;
  }
}
