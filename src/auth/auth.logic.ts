import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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
      throw new UnauthorizedException('invalid password or user not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('invalid password or user not found');
    }
    const payload = { sub: user.email };
    const jwt = await this.jwtService.signAsync(payload);
    return { access_token: jwt };
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    const userExists = await this.usersService.findOne(email);
    if (userExists) {
      throw new UnauthorizedException(
        'user already exists or error registering a new user',
      );
    }
    const user = await this.usersService.create(email, password);
    if (!user) {
      throw new UnauthorizedException(
        'user already exists or error registering a new user',
      );
    }
    const payload = { sub: user.email };
    const jwt = await this.jwtService.signAsync(payload);

    return { access_token: jwt };
  }
}
