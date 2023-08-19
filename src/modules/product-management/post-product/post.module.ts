import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreatePostCommandHandler } from 'src/modules/product-management/post-product/application/commands/create.post.command';
import { DeletePostCommandHandler } from 'src/modules/product-management/post-product/application/commands/delete.post.command';
import { UpdatePostCommandHandler } from 'src/modules/product-management/post-product/application/commands/update.post.command';
import { POST_REPOSITORY } from 'src/modules/product-management/post-product/application/ports/post.repository';
import { PostFindManyQueryHandler } from 'src/modules/product-management/post-product/application/query/find.many.query.post';
import { PostgresqlPostAdapter } from 'src/modules/product-management/post-product/infrastructure/adapter/postgresql.post.adapter';
import { PostController } from 'src/modules/product-management/post-product/infrastructure/delivery/post.http.controller';

const repositories: Provider[] = [
  {
    provide: POST_REPOSITORY,
    useClass: PostgresqlPostAdapter,
  },
];
const commands: Provider[] = [
  CreatePostCommandHandler,
  UpdatePostCommandHandler,
  DeletePostCommandHandler,
];
const queryHandlers: Provider[] = [
  // PostDetailQueryHandler,
  PostFindManyQueryHandler,
];
@Module({
  imports: [CqrsModule],
  providers: [...commands, ...repositories, ...queryHandlers],
  controllers: [PostController],
  exports: [],
})
export class PostModule {}
