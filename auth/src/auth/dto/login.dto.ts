import { IsNotEmpty, IsString } from 'class-validator';
import { RegisterDto } from './register.dto';

export class LoginDto implements RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
