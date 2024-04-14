import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { ExceptionsControllers } from '../utils/exceptions/exceptions-controllers';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async singIn(@Body() loginDto: LoginDto, @Res() res: Response) {
    try {
      const result = await this.authService.signIn(
        loginDto?.username,
        loginDto?.password,
      );

      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }
}
