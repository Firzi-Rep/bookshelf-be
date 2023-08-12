import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CategoryEntity } from 'src/modules/product-management/category/entity/entity.category';
import {
  CATEGORY_REPOSITORY,
  CategoryRepository,
} from 'src/modules/product-management/category/ports/repository.category';
import { Inject } from '@nestjs/common';
import { Builder } from 'builder-pattern';

export class CategoryFindManyQuery {
  page?: number;
  limit?: number;
}

export class CategoryFindManyQueryResult {
  data: CategoryEntity[];
  total: number;
}

@QueryHandler(CategoryFindManyQuery)
export class CategoryFindManyQueryHandler
  implements IQueryHandler<CategoryFindManyQuery, CategoryFindManyQueryResult>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY) private categoryRepository: CategoryRepository,
  ) {}
  async execute(
    query: CategoryFindManyQuery,
  ): Promise<CategoryFindManyQueryResult> {
    const category = await this.categoryRepository.findMany({
      ...query,
    });
    const total = await this.categoryRepository.countMany({
      ...query,
    });

    return Builder<CategoryFindManyQueryResult>(CategoryFindManyQueryResult)
      .data(category)
      .total(total)
      .build();
  }
}
