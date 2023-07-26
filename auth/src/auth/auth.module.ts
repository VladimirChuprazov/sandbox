import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { EncrypterService } from '../encrypter/encrypter.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, EncrypterService],
})
export class AuthModule {}
