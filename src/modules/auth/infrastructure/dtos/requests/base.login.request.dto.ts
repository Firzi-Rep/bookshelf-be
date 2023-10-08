import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, isString } from 'class-validator';

export class BaseLoginRequestDto {
  @ApiProperty()
  login_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
