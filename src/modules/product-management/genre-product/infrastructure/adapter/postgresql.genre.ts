import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import {
  GenreFindManyQueryProps,
  GenreRepository,
} from 'src/modules/product-management/genre-product/application/ports/genre.repository';
import {
  CreateGenreProps,
  UpdateGenreProps,
} from 'src/modules/product-management/genre-product/application/types/genre.property';
import { GenreEntity } from 'src/modules/product-management/genre-product/domain/genre.entity';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
const { v4: uuidv4 } = require('uuid');

@Injectable()
export class PostgresqlGenreAdapter implements GenreRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    props: CreateGenreProps,
    session?: PrismaService,
  ): Promise<GenreEntity> {
    let prisma = this.prismaService;
    if (session) prisma = session;
    try {
      const rawCreated = await prisma.genreProduct.create({
        data: {
          id: uuidv4(),
          name: props.name,
        },
      });

      const createdEntity = Builder<GenreEntity>(GenreEntity, {
        ...rawCreated,
      }).build();

      //  console.log("created entity",createdEntity)
      return createdEntity;
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }

  async update(
    props: UpdateGenreProps,
    session?: PrismaService,
  ): Promise<GenreEntity> {
    try {
      let prisma = this.prismaService;
      if (session) prisma = session;

      const result = await prisma.genreProduct.update({
        where: {
          id: props.id,
        },
        data: {
          name: props.name,
        },
      });

      const entity = Builder<GenreEntity>(GenreEntity, {
        ...result,
      }).build();

      return entity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteMany(ids: string[]): Promise<void> {
    try {
      await this.prismaService.genreProduct.deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findMany(props: GenreFindManyQueryProps): Promise<GenreEntity[]> {
    const { page, limit } = props;

    const getLimit = limit ? limit : 10;
    const getPage = page ? page : 1;
    const offset = (getPage - 1) * getLimit;

    const result = await this.prismaService.product.findMany({
      skip: offset,
      take: getLimit,
      include: {
        genre: true,
      },
    });

    const entity = result.map((item) => {
      const genreEntity = Builder<GenreEntity>(GenreEntity, {
        ...item.genre,
      }).build();

      // return Builder<ProductEntity>(ProductEntity, {
      //   ...item,
      //   category: categoryEntity,
      // }).build();
      return genreEntity;
    });

    return entity;
  }

  async countMany(props: GenreFindManyQueryProps): Promise<number> {
    const result = await this.prismaService.categoryProduct.count();

    return result;
  }
}
