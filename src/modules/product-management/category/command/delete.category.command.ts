import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CATEGORY_REPOSITORY,
  CategoryRepository,
} from 'src/modules/product-management/category/ports/repository.category';
import { Inject } from '@nestjs/common';
import { Builder } from 'builder-pattern';

export class DeleteCategoryCommand {
  ids: string[];
}

export class DeleteCategoryCommandResult {}

@CommandHandler(DeleteCategoryCommand)
export class DeleteProductCommandHandler
  implements
    ICommandHandler<DeleteCategoryCommand, DeleteCategoryCommandResult>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY) private categoryRepository: CategoryRepository,
  ) {}
  async execute(
    command: DeleteCategoryCommand,
  ): Promise<DeleteCategoryCommandResult> {
    await this.categoryRepository.deleteMany(command.ids);

    return Builder<DeleteCategoryCommandResult>(
      DeleteCategoryCommandResult,
    ).build();
  }
}
