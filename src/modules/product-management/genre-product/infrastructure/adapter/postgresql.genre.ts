import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { GenreRepository } from 'src/modules/product-management/genre-product/application/ports/genre.repository';
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
}
