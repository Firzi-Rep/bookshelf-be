import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CategoryEntity } from 'src/modules/product-management/category/entity/entity.category';
import {
  CATEGORY_REPOSITORY,
  CategoryRepository,
} from 'src/modules/product-management/category/ports/repository.category';

export class UpdateCategoryCommand {
  id: string;
  name: string;
}

export class UpdateCategoryCommandResult {
  category: CategoryEntity;
}

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryCommandHandler
  implements ICommandHandler<UpdateCategoryCommand>
{
  constructor(
    @Inject(CATEGORY_REPOSITORY) // inject menu repository (as a connection to db)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async execute(command: UpdateCategoryCommand): Promise<any> {
    const { id, name } = command;

    // Lakukan logika untuk memperbarui menu berdasarkan id, name, dan price
    await this.categoryRepository.update({ id, name });

    // Mengembalikan response atau hasil yang sesuai
    return { message: 'Books Category Updated Successfully' };
  }
}
