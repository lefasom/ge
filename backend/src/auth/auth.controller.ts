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
  registerUser(@Body() registerAuthDto: RegisterAuthDto){
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  loginUser(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) res: Response
  ) {

    return this.authService.login(loginAuthDto, res);

  }
  // Pruebas cookie
  @Get('login')
  createCookie(@Req() request:Request) {
    console.log(request.cookies)
  }
  @Get('delete_cookie')
  deleteCookie(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("user_token")
    res.clearCookie("token")
    console.log("borro cookies")
  }
  // @Get('cookie')
  // readCookie(@Req() request: Request) {
  //   console.log(request.cookies)
  // }
}
