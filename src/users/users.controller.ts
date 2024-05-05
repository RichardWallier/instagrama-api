import { Controller, Get, NotFoundException, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfile } from './models/UserProfile';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Req() request: any): Promise<UserProfile | null> {
    if (!request?.user?.email) {
      throw new NotFoundException('User not found');
    }
    return this.usersService.getProfileByEmail(request?.user?.email);
  }
}
