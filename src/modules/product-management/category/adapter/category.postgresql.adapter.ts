import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { CategoryEntity } from 'src/modules/product-management/category/entity/entity.category';
import { CategoryRepository } from 'src/modules/product-management/category/ports/repository.category';
import { CreateCategoryProps } from 'src/modules/product-management/category/types/props.category';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class CategoryPostgresqlAdapter implements CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    props: CreateCategoryProps,
    session?: PrismaService,
  ): Promise<CategoryEntity> {
    let prisma = this.prismaService;
    if (session) prisma = session;
    try {
      const rawCreated = await prisma.categoryProduct.create({
        data: {
          id: uuidv4(),
          name: props.name,
        },
      });

      const createdEntity = Builder<CategoryEntity>(CategoryEntity, {
        ...rawCreated,
      }).build();

      //  console.log("created entity",createdEntity)
      return createdEntity;
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }
}
