import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  GENRE_REPOSITORY,
  GenreRepository,
} from 'src/modules/product-management/genre-product/application/ports/genre.repository';
import { Builder } from 'builder-pattern';

export class DeleteGenreCommand {
  ids: string[];
}

export class DeleteGenreCommandResult {}

@CommandHandler(DeleteGenreCommand)
export class DeleteGenreCommandHandler
  implements ICommandHandler<DeleteGenreCommand, DeleteGenreCommandResult>
{
  constructor(
    @Inject(GENRE_REPOSITORY) private genreRepository: GenreRepository,
  ) {}
  async execute(
    command: DeleteGenreCommand,
  ): Promise<DeleteGenreCommandResult> {
    await this.genreRepository.deleteMany(command.ids);

    return Builder<DeleteGenreCommandResult>(DeleteGenreCommandResult).build();
  }
}
