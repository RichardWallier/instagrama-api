import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AllowAnon } from 'src/decorators/AllowAnon';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @AllowAnon()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  register(@Body() loginDto: LoginDto) {
    return this.authService.register(loginDto.email, loginDto.password);
  }
}
