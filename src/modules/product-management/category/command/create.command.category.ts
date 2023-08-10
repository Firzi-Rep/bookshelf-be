import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryPostgresqlAdapter } from 'src/modules/product-management/category/adapter/category.postgresql.adapter';
import { CategoryEntity } from 'src/modules/product-management/category/entity/entity.category';
import { CATEGORY_REPOSITORY } from 'src/modules/product-management/category/ports/repository.category';

export class CategoryCreateCommand {
  name: string;
}

export class CategoryCreateCommandResult {
  category: CategoryEntity;
}

@CommandHandler(CategoryCreateCommand)
export class CategoryCreateCommandHandler
  implements
    ICommandHandler<CategoryCreateCommand, CategoryCreateCommandResult>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryPostgresqlAdapter: CategoryPostgresqlAdapter,
  ) {}

  async execute(command: CategoryCreateCommand) {
    // console.log('masuk command product create ni bos wkwkwk' )
    const result = await this.categoryPostgresqlAdapter.create({ ...command });

    return {
      category: result,
    };
  }
}
