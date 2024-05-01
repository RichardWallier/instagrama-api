import { PrismaClient, User } from '@prisma/client';

export class UsersLogic {
  prisma = new PrismaClient();
  constructor() {}

  public async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async create(email: string, password: string): Promise<User | null> {
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
}
