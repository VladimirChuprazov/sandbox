import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { RegisterDto } from './register.dto';

export class LoginDto implements RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
