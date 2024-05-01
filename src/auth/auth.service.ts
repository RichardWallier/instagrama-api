import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthLogic } from './logic/auth.logic';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private authLogic: AuthLogic) {}

  async login(email: string, password: string): Promise<User | null> {
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    return this.authLogic.login(email, password);
  }
}
