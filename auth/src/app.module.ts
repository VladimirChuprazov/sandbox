import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { EncrypterService } from './encrypter/encrypter.service';

@Module({
  imports: [AuthModule],
  providers: [PrismaService, EncrypterService],
})
export class AppModule {}
