import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import {
  POST_REPOSITORY,
  PostRepository,
} from 'src/modules/product-management/post-product/application/ports/post.repository';
import { PostEntity } from 'src/modules/product-management/post-product/domain/post.entity';

export class PostFindManyQuery {
  page?: number;
  limit?: number;
}

export class PostFindManyQueryResult {
  data: PostEntity[];
  total: number;
}

@QueryHandler(PostFindManyQuery)
export class PostFindManyQueryHandler
  implements IQueryHandler<PostFindManyQuery, PostFindManyQueryResult>
{
  constructor(
    @Inject(POST_REPOSITORY) private postRepository: PostRepository,
  ) {}
  async execute(query: PostFindManyQuery): Promise<PostFindManyQueryResult> {
    const products = await this.postRepository.findMany({
      ...query,
    });
    const total = await this.postRepository.countMany({
      ...query,
    });

    return Builder<PostFindManyQueryResult>(PostFindManyQueryResult)
      .data(products)
      .total(total)
      .build();
  }
}
