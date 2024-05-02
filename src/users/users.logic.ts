import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export class UsersLogic {
  prisma = new PrismaClient();
  constructor() {}

  public async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async create(email: string, password: string): Promise<User | null> {
    const saltOrRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltOrRounds);
    return this.prisma.user.create({
      data: {
        email,
        password: hashed_password,
      },
    });
  }
}
