import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class FindManyQueryPostDto {
  page: number;
  limit: number;
  // @ApiProperty({
  //   type: Number,
  //   example: 1,
  // })
  // @Type(() => Number)
  // page: number;
  // @ApiProperty({
  //   type: Number,
  //   example: 10,
  // })
  // @Type(() => Number)
  // limit: number;
}
