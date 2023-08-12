import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
} from 'src/modules/product-management/product/application/ports/repository.product';
import { Builder } from 'builder-pattern';

export class DeleteProductCommand {
  ids: string[];
}

export class DeleteProductCommandResult {}

@CommandHandler(DeleteProductCommand)
export class DeleteProductCommandHandler
  implements ICommandHandler<DeleteProductCommand, DeleteProductCommandResult>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY) private productRepository: ProductRepository,
  ) {}
  async execute(
    command: DeleteProductCommand,
  ): Promise<DeleteProductCommandResult> {
    await this.productRepository.deleteMany(command.ids);

    return Builder<DeleteProductCommandResult>(
      DeleteProductCommandResult,
    ).build();
  }
}
