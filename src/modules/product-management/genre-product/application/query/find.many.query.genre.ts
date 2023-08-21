import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import {
  GENRE_REPOSITORY,
  GenreRepository,
} from 'src/modules/product-management/genre-product/application/ports/genre.repository';
import { GenreEntity } from 'src/modules/product-management/genre-product/domain/genre.entity';

export class GenreFindManyQuery {
  page?: number;
  limit?: number;
}

export class GenreFindManyQueryResult {
  data: GenreEntity[];
  total: number;
}

@QueryHandler(GenreFindManyQuery)
export class GenreFindManyQueryHandler
  implements IQueryHandler<GenreFindManyQuery, GenreFindManyQueryResult>
{
  constructor(
    @Inject(GENRE_REPOSITORY) private genreRepository: GenreRepository,
  ) {}
  async execute(query: GenreFindManyQuery): Promise<GenreFindManyQueryResult> {
    const genre = await this.genreRepository.findMany({
      ...query,
    });
    const total = await this.genreRepository.countMany({
      ...query,
    });

    return Builder<GenreFindManyQueryResult>(GenreFindManyQueryResult)
      .data(genre)
      .total(total)
      .build();
  }
}
