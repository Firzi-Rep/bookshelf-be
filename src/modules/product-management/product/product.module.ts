import { Module, Provider } from '@nestjs/common';
import { CqrsModule, QueryHandler } from '@nestjs/cqrs';
import { CreateProductCommandHandler } from 'src/modules/product-management/product/application/command/create.product.command';
import { UpdateProductCommandHandler } from 'src/modules/product-management/product/application/command/update.product.command';
import { PRODUCT_REPOSITORY } from 'src/modules/product-management/product/application/ports/repository.product';
import { ProductDetailQueryHandler } from 'src/modules/product-management/product/application/query/detail.query.product';
import { ProductFindManyQueryHandler } from 'src/modules/product-management/product/application/query/find.many.query.product';
import { ProductPostgresqlAdapter } from 'src/modules/product-management/product/infrastructure/adapter/postgresql.product.adapter';
import { ProductController } from 'src/modules/product-management/product/infrastructure/delivery/product.http.controller';

const repositories: Provider[] = [
  {
    provide: PRODUCT_REPOSITORY,
    useClass: ProductPostgresqlAdapter,
  },
];
const commands: Provider[] = [
  CreateProductCommandHandler,
  UpdateProductCommandHandler,
  // ProductDeleteCommandHandler,
];

const queryHandlers: Provider[] = [
  ProductDetailQueryHandler,
  ProductFindManyQueryHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...commands, ...repositories, ...queryHandlers],
  controllers: [ProductController],
  exports: [],
})
export class ProductModule {}
