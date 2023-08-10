import { CategoryEntity } from 'src/modules/product-management/category/entity/entity.category';
import {
  CreateCategoryProps,
  UpdateCategoryProps,
} from 'src/modules/product-management/category/types/props.category';

export const CATEGORY_REPOSITORY = 'CATEGORY_REPOSITORY';

export interface CategoryFindManyQueryProps {
  limit?: number;
  page?: number;
}

export interface CategoryRepository {
  create(props: CreateCategoryProps): Promise<CategoryEntity>;

  // findById(id: string): Promise<CategoryEntity>;

  // findMany(props?: CategoryFindManyQueryProps): Promise<CategoryEntity[]>;

  // countMany(props?: CategoryFindManyQueryProps): Promise<number>;

  // update(props: UpdateCategoryProps): Promise<CategoryEntity>;

  // deleteMany(ids: string[]): Promise<void>;
}
