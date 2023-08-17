import { Injectable } from '@nestjs/common';
import {
  FindManyProductQueryProps,
  ProductRepository,
} from 'src/modules/product-management/product/application/ports/repository.product';
import {
  CreateProductProps,
  UpdateProductProps,
} from 'src/modules/product-management/product/application/types/props.product';
import { ProductEntity } from 'src/modules/product-management/product/domain/entity.product';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { Builder } from 'builder-pattern';
import { CategoryEntity } from 'src/modules/product-management/category/entity/entity.category';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductPostgresqlAdapter implements ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async create(
    props: CreateProductProps,
    session?: PrismaService,
  ): Promise<ProductEntity> {
    try {
      let prisma = this.prismaService;
      if (session) prisma = session;
      // console.log('masuk adapter', props)
      const result = await prisma.product.create({
        data: {
          id: uuidv4(),
          name: props.name,
          author: props.author,
          category_id: props.category_id,
        },
      });

      // console.log('masuk adapter', result )
      const entity = Builder<ProductEntity>(ProductEntity, {
        ...result,
      }).build();

      return entity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findById(id: string, session?: PrismaService): Promise<ProductEntity> {
    let prisma = this.prismaService;
    if (session) prisma = session;

    const result = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
      },
    });

    if (!result) {
      return null;
    }

    const categoryEntity = Builder<CategoryEntity>(CategoryEntity, {
      ...result.category,
    }).build();

    const entity = Builder<ProductEntity>(ProductEntity, {
      ...result,
      category: categoryEntity,
    }).build();

    return entity;
  }

  async findMany(props: FindManyProductQueryProps): Promise<ProductEntity[]> {
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
    // console.log('masuk gak ni gan', result);

    const entity = result.map((item) => {
      const categoryEntity = Builder<CategoryEntity>(CategoryEntity, {
        ...item.category,
      }).build();

      return Builder<ProductEntity>(ProductEntity, {
        ...item,
        category: categoryEntity,
      }).build();
    });

    return entity;
  }

  async countMany(props: FindManyProductQueryProps): Promise<number> {
    const result = await this.prismaService.product.count();

    return result;
  }

  async update(
    props: UpdateProductProps,
    session?: PrismaService,
  ): Promise<ProductEntity> {
    try {
      let prisma = this.prismaService;
      if (session) prisma = session;

      const result = await prisma.product.update({
        where: {
          id: props.id,
        },
        data: {
          name: props.name,
          author: props.author,
          category_id: props.category_id,
        },
      });

      const entity = Builder<ProductEntity>(ProductEntity, {
        ...result,
      }).build();

      return entity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.prismaService.product.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteMany(ids: string[]): Promise<void> {
    try {
      await this.prismaService.product.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
