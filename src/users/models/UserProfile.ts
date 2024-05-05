import { User } from '@prisma/client';

export class UserProfile {
  email: string;
  name: string;
  surname: string;
  constructor(user: User) {
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
  }
}
