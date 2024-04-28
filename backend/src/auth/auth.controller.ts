import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Request, Response } from 'express';
import { Tokens } from './types/token.type';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  registerUser(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  loginUser(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
  @Post('refresh')
  refreshToken(@Body() tokens: any) {
    return this.authService.refreshTokens({ userId: tokens.user._id, rt: tokens.tokens.refresh_token });
  }

  @Post('logout')
  async logout(@Body() userId: any) {
    try {
      await this.authService.logout(userId);
      return { message: 'Logout successful' };
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }
}
