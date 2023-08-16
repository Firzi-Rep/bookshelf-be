import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  GENRE_REPOSITORY,
  GenreRepository,
} from 'src/modules/product-management/genre-product/application/ports/genre.repository';
import { GenreEntity } from 'src/modules/product-management/genre-product/domain/genre.entity';

export class UpdateGenreCommand {
  id: string;
  name: string;
}

export class UpdateGenreCommandResult {
  category: GenreEntity;
}

@CommandHandler(UpdateGenreCommand)
export class UpdateGenreCommandHandler
  implements ICommandHandler<UpdateGenreCommand>
{
  constructor(
    @Inject(GENRE_REPOSITORY) // inject menu repository (as a connection to db)
    private readonly genreRepository: GenreRepository,
  ) {}

  async execute(command: UpdateGenreCommand): Promise<any> {
    const { id, name } = command;

    // Lakukan logika untuk memperbarui menu berdasarkan id, name, dan price
    await this.genreRepository.update({ id, name });

    // Mengembalikan response atau hasil yang sesuai
    return { message: 'Books Category Updated Successfully' };
  }
}
