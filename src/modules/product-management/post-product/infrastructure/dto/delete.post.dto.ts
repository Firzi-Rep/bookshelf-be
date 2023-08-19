import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeletePostManyDto {
  @ApiProperty({
    type: [String],
  })
  @IsArray()
  ids: string[];
}
