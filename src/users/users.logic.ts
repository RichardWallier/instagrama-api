import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { UserProfile } from './models/UserProfile';

export class UsersLogic {
  prisma = new PrismaClient();
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  public async create(
    email: string,
    password: string,
    name: string,
    surname: string,
  ): Promise<User | null> {
    const saltOrRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltOrRounds);
    return this.prisma.user.create({
      data: {
        email,
        password: hashed_password,
        name,
        surname,
      },
    });
  }

  async getProfileByEmail(email: string): Promise<UserProfile | null> {
    const cacheKey = `user_profile_${email}`;
    let profile = await this.cacheManager.get<UserProfile>(cacheKey);
    if (!profile) {
      console.log('cache miss');
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new Error('User not found');
      }
      profile = new UserProfile(user);
      await this.cacheManager.set(cacheKey, profile);
    }

    return profile;
  }
}
