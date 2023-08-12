import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { CategoryEntity } from 'src/modules/product-management/category/entity/entity.category';
import {
  CategoryFindManyQueryProps,
  CategoryRepository,
} from 'src/modules/product-management/category/ports/repository.category';
import {
  CreateCategoryProps,
  UpdateCategoryProps,
} from 'src/modules/product-management/category/types/props.category';
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

  async findMany(props: CategoryFindManyQueryProps): Promise<CategoryEntity[]> {
    const { page, limit } = props;

    const getLimit = limit ? limit : 10;
    const getPage = page ? page : 1;
    const offset = (getPage - 1) * getLimit;

    const result = await this.prismaService.product.findMany({
      skip: offset,
      take: getLimit,
      include: {
        category: true,
      },
    });

    const entity = result.map((item) => {
      const categoryEntity = Builder<CategoryEntity>(CategoryEntity, {
        ...item.category,
      }).build();

      // return Builder<ProductEntity>(ProductEntity, {
      //   ...item,
      //   category: categoryEntity,
      // }).build();
      return categoryEntity;
    });

    return entity;
  }

  async countMany(props: CategoryFindManyQueryProps): Promise<number> {
    const result = await this.prismaService.categoryProduct.count();

    return result;
  }

  async update(
    props: UpdateCategoryProps,
    session?: PrismaService,
  ): Promise<CategoryEntity> {
    try {
      let prisma = this.prismaService;
      if (session) prisma = session;

      const result = await prisma.categoryProduct.update({
        where: {
          id: props.id,
        },
        data: {
          name: props.name,
        },
      });

      const entity = Builder<CategoryEntity>(CategoryEntity, {
        ...result,
      }).build();

      return entity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
