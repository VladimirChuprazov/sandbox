import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthEntity> {
    return new AuthEntity(await this.authService.register(registerDto));
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthEntity> {
    return new AuthEntity(await this.authService.login(loginDto));
  }
}
