import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeleteProductManyDto {
  @ApiProperty({
    type: [String],
  })
  @IsArray()
  ids: string[];
}
