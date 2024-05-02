import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthLogic {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    if (user?.password !== password) {
      throw new UnauthorizedException('wrong password');
    }

    const payload = { sub: user.email };
    const jwt = await this.jwtService.signAsync(payload);

    return { access_token: jwt };
  }

  async register(email: string, password: string): Promise<User | null> {
    const userExists = await this.usersService.findOne(email);
    if (userExists) {
      throw new UnauthorizedException('user already exists');
    }
    const user = await this.usersService.create(email, password);
    if (!user) {
      throw new UnauthorizedException('error registering a new user');
    }
    return user;
  }
}
