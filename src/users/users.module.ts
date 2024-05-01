import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersLogic } from './users.logic';

@Module({
  imports: [],
  controllers: [],
  providers: [UsersService, UsersLogic],
  exports: [UsersService, UsersLogic],
})
export class UsersModule {}
