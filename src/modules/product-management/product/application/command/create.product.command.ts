import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductRepository } from 'src/modules/product-management/product/application/ports/repository.product';
import { ProductEntity } from 'src/modules/product-management/product/domain/entity.product';

export class CreateProductCommand {
  id: string;
  name: string;
  author: string;
  category_id?: string;
}

export class CreateProductCommandResult {
  product: ProductEntity;
}

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject('PRODUCT_REPOSITORY') // inject menu repository (as a connection to db)
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(command: CreateProductCommand) {
    // console.log('masuk command product create ni bos wkwkwk' )
    const product = await this.productRepo.create(command);

    return {
      product,
    };
  }
}
