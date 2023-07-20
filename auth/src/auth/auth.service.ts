import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { EncrypterService } from 'src/encrypter/encrypter.service';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private encrypterService: EncrypterService,
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

    const hashedPassword = await this.encrypterService.hash(password);

    await this.prismaService.user.create({
      data: {
        email: username,
        password: hashedPassword,
      },
    });

    return { accessToken: '123' };
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const { username, password } = loginDto;

    const user = await this.prismaService.user.findUnique({
      where: { email: username },
    });

    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    const isPasswordValid = await this.encrypterService.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong credentials');
    }

    return { accessToken: '123' };
  }
}
