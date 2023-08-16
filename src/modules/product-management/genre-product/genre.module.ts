import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateGenreCommandHandler } from 'src/modules/product-management/genre-product/application/command/create.genre.command';
import { GENRE_REPOSITORY } from 'src/modules/product-management/genre-product/application/ports/genre.repository';
import { PostgresqlGenreAdapter } from 'src/modules/product-management/genre-product/infrastructure/adapter/postgresql.genre';
import { GenreController } from 'src/modules/product-management/genre-product/infrastructure/delivery/genre.http.controller';

const repositories: Provider[] = [
  {
    provide: GENRE_REPOSITORY,
    useClass: PostgresqlGenreAdapter,
  },
];
const commands: Provider[] = [
  CreateGenreCommandHandler,
  // UpdateCategoryCommandHandler,
  // CategoryDeleteCommandHandler,
  // ProductUpdateCommandHandler,
];

const queryHandlers: Provider[] = [
  CreateGenreCommandHandler,
  // CategoryFindManyQueryHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...commands, ...repositories, ...queryHandlers],
  controllers: [GenreController],
  exports: [],
})
export class GenreModule {}