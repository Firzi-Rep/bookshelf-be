import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  POST_REPOSITORY,
  PostRepository,
} from 'src/modules/product-management/post-product/application/ports/post.repository';
import { PostEntity } from 'src/modules/product-management/post-product/domain/post.entity';
export class UpdatePostCommand {
  id: string;
  title: string;
  content: string;
}

export class UpdatePostCommandResult {
  post: PostEntity;
}

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler
  implements ICommandHandler<UpdatePostCommand>
{
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async execute(command: UpdatePostCommand): Promise<any> {
    const { id, title, content } = command;

    // Lakukan logika untuk memperbarui menu berdasarkan id, name, dan price
    await this.postRepository.update({ id, title, content });

    // Mengembalikan response atau hasil yang sesuai
    return { message: 'Books Updated Successfully' };
  }
}
