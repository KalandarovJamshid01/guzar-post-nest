import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(200)
  @Post('/login')
  async login(@Body() { email, password }: AuthDto) {
    return this.authService.login(email, password);
  }

  // @HttpCode(200)
  // @Post('/one-id')
  // async oneId(@Body() { email, password }: AuthDto) {}
}
