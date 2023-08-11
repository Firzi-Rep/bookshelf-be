import { CreateProductProps } from 'src/modules/product-management/product/application/types/props.product';
import { ProductEntity } from 'src/modules/product-management/product/domain/entity.product';

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';

export interface FindManyProductQueryProps {
  limit?: number;
  page?: number;
}

export interface ProductRepository {
  create(props: CreateProductProps): Promise<ProductEntity>;

  findById(id: string): Promise<ProductEntity>;

  findMany(props?: FindManyProductQueryProps): Promise<ProductEntity[]>;

  countMany(props?: FindManyProductQueryProps): Promise<number>;

  // update(props: UpdateProductProps): Promise<ProductEntity>;

  // deleteById(id: string): Promise<void>;

  // deleteMany(ids: string[]): Promise<void>;
}
