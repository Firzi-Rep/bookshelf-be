import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GENRE_REPOSITORY } from 'src/modules/product-management/genre-product/application/ports/genre.repository';
import { GenreEntity } from 'src/modules/product-management/genre-product/domain/genre.entity';
import { PostgresqlGenreAdapter } from 'src/modules/product-management/genre-product/infrastructure/adapter/postgresql.genre';

export class CreateGenreCommand {
  name: string;
}

export class CreateGenreCommandResult {
  genre: GenreEntity;
}

@CommandHandler(CreateGenreCommand)
export class CreateGenreCommandHandler
  implements ICommandHandler<CreateGenreCommand, CreateGenreCommandResult>
{
  constructor(
    @Inject(GENRE_REPOSITORY)
    private readonly postgresqlGenreAdapter: PostgresqlGenreAdapter,
  ) {}

  async execute(command: CreateGenreCommand) {
    // console.log('masuk command product create ni bos wkwkwk' )
    const result = await this.postgresqlGenreAdapter.create({ ...command });

    return {
      genre: result,
    };
  }
}
