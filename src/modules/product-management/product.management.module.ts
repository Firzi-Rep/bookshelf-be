import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryModule } from 'src/modules/product-management/category/category.module';
import { GenreModule } from 'src/modules/product-management/genre-product/genre.module';
import { PostModule } from 'src/modules/product-management/post-product/post.module';
import { ProductModule } from 'src/modules/product-management/product/product.module';

const importedModule = [
  CqrsModule,
  CategoryModule,
  ProductModule,
  GenreModule,
  PostModule,
];

@Module({
  imports: [...importedModule],
})
export class ProductManagementModule {}
