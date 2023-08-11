import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/modules/product-management/product/application/ports/repository.product';
import { ProductEntity } from 'src/modules/product-management/product/domain/entity.product';

export class ProductFindManyQuery {
  page?: number;
  limit?: number;
}

export class ProductFindManyQueryResult {
  data: ProductEntity[];
  total: number;
}

@QueryHandler(ProductFindManyQuery)
export class ProductFindManyQueryHandler
  implements IQueryHandler<ProductFindManyQuery, ProductFindManyQueryResult>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: ProductRepository,
  ) {}
  async execute(
    query: ProductFindManyQuery,
  ): Promise<ProductFindManyQueryResult> {
    const products = await this.productRepository.findMany({
      ...query,
    });
    const total = await this.productRepository.countMany({
      ...query,
    });

    return Builder<ProductFindManyQueryResult>(ProductFindManyQueryResult)
      .data(products)
      .total(total)
      .build();
  }
}
