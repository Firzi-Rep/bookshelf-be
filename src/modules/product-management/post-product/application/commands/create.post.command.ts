import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from 'src/modules/auth/domain/user.entity';
import { PostRepository } from 'src/modules/product-management/post-product/application/ports/post.repository';
import { PostEntity } from 'src/modules/product-management/post-product/domain/post.entity';

export class CreatePostCommand {
  id: string;
  userId: string;
  title: string;
  content: string;
  user: UserEntity;
}

export class CreatePostCommandResult {
  post: PostEntity;
}

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand, CreatePostCommandResult>
{
  constructor(
    @Inject('POST_REPOSITORY')
    private readonly postRepo: PostRepository,
  ) {}

  async execute(command: CreatePostCommand) {
    const post = await this.postRepo.create(command);
    return {
      post,
    };
  }
}
