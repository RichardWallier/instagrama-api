import { Injectable } from '@nestjs/common';
import { AuthLogic } from './auth.logic';

@Injectable()
export class AuthService {
  constructor(private authLogic: AuthLogic) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    return this.authLogic.login(email, password);
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    return this.authLogic.register(email, password);
  }
}
