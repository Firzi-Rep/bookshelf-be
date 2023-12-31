import {
  CreatePostProps,
  UpdatePostProps,
} from 'src/modules/product-management/post-product/application/types/post.props';
import { PostEntity } from 'src/modules/product-management/post-product/domain/post.entity';

export const POST_REPOSITORY = 'POST_REPOSITORY';

export interface FindManyPostQueryProps {
  limit?: number;
  page?: number;
}

export interface PostRepository {
  create(props: CreatePostProps): Promise<PostEntity>;

  update(props: UpdatePostProps): Promise<PostEntity>;

  findMany(props?: FindManyPostQueryProps): Promise<PostEntity[]>;

  countMany(props?: FindManyPostQueryProps): Promise<number>;

  deleteMany(ids: string[]): Promise<void>;
}
