import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersLogic } from './users.logic';
import { UsersController } from './users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, UsersLogic],
  exports: [UsersService, UsersLogic],
})
export class UsersModule {}
