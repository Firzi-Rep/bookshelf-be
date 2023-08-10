import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryCreateDto {
  //     id                 String    @id @default(auto()) @map("_id") @db.ObjectId()
  //   name               String    // Category Product Name: makanan & minuman
  //   created_at         DateTime  @default(now())
  //   updated_at         DateTime  @updatedAt
  //   Product            Product[]

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
