import { Injectable } from '@nestjs/common';
import { AuthLogic } from './logic/auth.logic';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private authLogic: AuthLogic) {}

  async login(email: string, password: string): Promise<User | null> {
    return this.authLogic.login(email, password);
  }

  async register(email: string, password: string): Promise<User | null> {
    return this.authLogic.register(email, password);
  }
}
