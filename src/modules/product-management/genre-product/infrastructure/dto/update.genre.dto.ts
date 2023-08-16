import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGenreDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
