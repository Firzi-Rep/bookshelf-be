import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryModule } from 'src/modules/product-management/category/category.module';
import { ProductModule } from 'src/modules/product-management/product/product.module';

const importedModule = [CqrsModule, CategoryModule, ProductModule];

@Module({
  imports: [...importedModule],
})
export class ProductManagementModule {}
