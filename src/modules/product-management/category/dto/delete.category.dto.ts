import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CategoryDeleteManyDto {
  @ApiProperty({
    type: [String],
  })
  @IsArray()
  ids: string[];
}
