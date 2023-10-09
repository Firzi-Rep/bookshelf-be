import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, Length, isNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(4, 20) // Panjang username minimal 4 karakter dan maksimal 20 karakter
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(8, 20) // Panjang kata sandi minimal 8 karakter dan maksimal 20 karakter
  password: string;
}
