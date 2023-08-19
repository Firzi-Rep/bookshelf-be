import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  POST_REPOSITORY,
  PostRepository,
} from 'src/modules/product-management/post-product/application/ports/post.repository';
import { Builder } from 'builder-pattern';

export class DeletePostCommand {
  ids: string[];
}

export class DeletePostCommandResult {}

@CommandHandler(DeletePostCommand)
export class DeletePostCommandHandler
  implements ICommandHandler<DeletePostCommand, DeletePostCommandResult>
{
  constructor(
    @Inject(POST_REPOSITORY) private postRepository: PostRepository,
  ) {}
  async execute(command: DeletePostCommand): Promise<DeletePostCommandResult> {
    await this.postRepository.deleteMany(command.ids);

    return Builder<DeletePostCommandResult>(DeletePostCommandResult).build();
  }
}
