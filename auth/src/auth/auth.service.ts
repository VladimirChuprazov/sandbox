import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { EncrypterService } from '../encrypter/encrypter.service';
import { AuthEntity } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly encrypterService: EncrypterService,
    private readonly jwtService: JwtService,
  ) {}

  private async checkIfUserExists(
    username: RegisterDto['username'] | LoginDto['username'],
  ): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: { email: username },
    });
    return Boolean(user);
  }

  async register(registerDto: RegisterDto): Promise<AuthEntity> {
    const { username, password } = registerDto;

    const userExists = await this.checkIfUserExists(username);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const { hashedStr, salt } = await this.encrypterService.hash(password);

    const user = await this.prismaService.user.create({
      data: {
        email: username,
        password: `${hashedStr}.${salt}`,
      },
    });

    const payload = { sub: user.id, email: user.email };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const { username, password } = loginDto;

    const user = await this.prismaService.user.findUnique({
      where: { email: username },
    });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const [hashedPassword, salt] = user.password.split('.');

    const isPasswordValid = await this.encrypterService.compare(
      password,
      hashedPassword,
      salt,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const payload = { sub: user.id, email: user.email };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
