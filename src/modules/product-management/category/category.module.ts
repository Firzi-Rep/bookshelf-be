import { CATEGORY_REPOSITORY } from 'src/modules/product-management/category/ports/repository.category';
import { Module, Provider } from '@nestjs/common';
import { CategoryPostgresqlAdapter } from 'src/modules/product-management/category/adapter/category.postgresql.adapter';
import { CategoryCreateCommandHandler } from 'src/modules/product-management/category/command/create.command.category';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryController } from 'src/modules/product-management/category/controller/controller.category';

const repositories: Provider[] = [
  {
    provide: CATEGORY_REPOSITORY,
    useClass: CategoryPostgresqlAdapter,
  },
];
const commands: Provider[] = [
  CategoryCreateCommandHandler,
  // CategoryUpdateCommandHandler,
  // CategoryDeleteCommandHandler,
  //   ProductUpdateCommandHandler,
];

const queryHandlers: Provider[] = [
  CategoryCreateCommandHandler,
  // CategoryFindManyQueryHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...commands, ...repositories, ...queryHandlers],
  controllers: [CategoryController],
  exports: [],
})
export class CategoryModule {}