import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CategoryFindManyQueryDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @Type(() => Number)
  page: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @Type(() => Number)
  limit: number;
}
