import { CreateGenreProps } from 'src/modules/product-management/genre-product/application/types/genre.property';
import { GenreEntity } from 'src/modules/product-management/genre-product/domain/genre.entity';

export const GENRE_REPOSITORY = 'GENRE_REPOSITORY';

export interface GenreFindManyQueryProps {
  limit?: number;
  page?: number;
}

export interface GenreRepository {
  create(props: CreateGenreProps): Promise<GenreEntity>;

  // findById(id: string): Promise<ProductEntity>;

  // findMany(props?: FindManyProductQueryProps): Promise<ProductEntity[]>;

  // countMany(props?: FindManyProductQueryProps): Promise<number>;

  // update(props: UpdateProductProps): Promise<ProductEntity>;

  // deleteById(id: string): Promise<void>;

  // deleteMany(ids: string[]): Promise<void>;
}
