import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeleteGenreManyDto {
  @ApiProperty({
    type: [String],
  })
  @IsArray()
  ids: string[];
}
