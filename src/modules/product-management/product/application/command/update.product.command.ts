import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/modules/product-management/product/application/ports/repository.product';
import { ProductEntity } from 'src/modules/product-management/product/domain/entity.product';

export class UpdateProductCommand {
  id: string;
  name: string;
  author: string;
  category_id?: string;
}

export class UpdateProductCommandResult {
  product: ProductEntity;
}

@CommandHandler(UpdateProductCommand)
export class UpdateProductCommandHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY) // inject menu repository (as a connection to db)
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(command: UpdateProductCommand): Promise<any> {
    const { id, name, author, category_id } = command;

    // Lakukan logika untuk memperbarui menu berdasarkan id, name, dan price
    await this.productRepository.update({ id, name, author, category_id });

    // Mengembalikan response atau hasil yang sesuai
    return { message: 'Books Updated Successfully' };
  }
}
