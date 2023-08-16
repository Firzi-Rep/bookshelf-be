import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import {
  CreateGenreCommand,
  CreateGenreCommandResult,
} from 'src/modules/product-management/genre-product/application/command/create.genre.command';
import { CreateGenreDto } from 'src/modules/product-management/genre-product/infrastructure/dto/create.genre.dto';

@Controller('product-management/genre')
@ApiTags('Genre')
export class GenreController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  async create(@Body() dto: CreateGenreDto) {
    try {
      const command = Builder<CreateGenreCommand>(CreateGenreCommand, {
        // category_name: dto.name
        ...dto,
      }).build();

      const result = await this.commandBus.execute<
        CreateGenreCommand,
        CreateGenreCommandResult
      >(command);

      // console.log('result on controller', result);
      return {
        statusCode: 201,
        message: 'success',
        data: result.genre,
      };
    } catch (e) {
      console.trace(e);
      throw e;
    }
  }
}
