import { Controller, Post, Body, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private handleAuth(accessToken: string, res: Response): void {
    const cookieExpirationTimeMS = this.configService.get<number>(
      'COOKIE_EXPIRATION_TIME_MS',
    );
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + cookieExpirationTimeMS),
    });
    res.send({ status: 'ok' });
  }

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res() res: Response,
  ): Promise<void> {
    const { accessToken } = await this.authService.register(registerDto);
    await this.handleAuth(accessToken, res);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    const { accessToken } = await this.authService.login(loginDto);
    await this.handleAuth(accessToken, res);
  }
}
