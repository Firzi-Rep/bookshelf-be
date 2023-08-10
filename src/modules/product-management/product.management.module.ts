import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryModule } from 'src/modules/product-management/category/category.module';

const importedModule = [CqrsModule, CategoryModule];

@Module({
  imports: [...importedModule],
})
export class ProductManagementModule {}
