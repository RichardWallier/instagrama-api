import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthLogic } from './logic/auth.logic';

@Module({
  imports: [UsersModule],
  providers: [AuthService, AuthLogic],
  controllers: [AuthController],
  exports: [AuthService, AuthLogic],
})
export class AuthModule {}
