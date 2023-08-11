import { CategoryEntity } from 'src/modules/product-management/category/entity/entity.category';

export class ProductEntity {
  _id?: string;
  name: string;
  author: string;
  category_id?: string;
  category?: CategoryEntity;
}
