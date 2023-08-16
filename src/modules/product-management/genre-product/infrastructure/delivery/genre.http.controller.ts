import {
  Controller,
  UseGuards,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Query,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { Response } from 'express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { baseHttpResponseHelper } from 'src/core/helper/base.response.helper';
import {
  UpdateCategoryCommand,
  UpdateCategoryCommandResult,
} from 'src/modules/product-management/category/command/update.category.command';
import { CategoryUpdateDto } from 'src/modules/product-management/category/dto/update.category.dto';
import {
  CreateGenreCommand,
  CreateGenreCommandResult,
} from 'src/modules/product-management/genre-product/application/command/create.genre.command';
import { CreateGenreDto } from 'src/modules/product-management/genre-product/infrastructure/dto/create.genre.dto';
import { UpdateGenreDto } from 'src/modules/product-management/genre-product/infrastructure/dto/update.genre.dto';
import {
  UpdateGenreCommand,
  UpdateGenreCommandResult,
} from 'src/modules/product-management/genre-product/application/command/update.genre.command';
import { DeleteGenreManyDto } from 'src/modules/product-management/genre-product/infrastructure/dto/delete.genre.dto';
import {
  DeleteGenreCommand,
  DeleteGenreCommandResult,
} from 'src/modules/product-management/genre-product/application/command/delete.genre.command';

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

  @Put(':id')
  async update(
    @Res() res: Response,
    @Body() dto: UpdateGenreDto,
    @Param('id') id: string,
  ) {
    try {
      const command = Builder<UpdateGenreCommand>(UpdateGenreCommand, {
        ...dto,
        id,
      }).build();

      const result = await this.commandBus.execute<
        UpdateGenreCommand,
        UpdateGenreCommandResult
      >(command);

      return baseHttpResponseHelper(res, {
        data: result,
      });
    } catch (e) {
      throw e;
    }
  }

  @Post('delete-many')
  async deleteMany(@Body() dto: DeleteGenreManyDto) {
    // console.log("masuk ke controller create product dengan payload",dto)
    const command = Builder<DeleteGenreCommand>(DeleteGenreCommand, {
      ...dto,
    }).build();

    await this.commandBus.execute<DeleteGenreCommand, DeleteGenreCommandResult>(
      command,
    );

    return {
      statusCode: 200,
      message: 'success',
      data: null,
    };
  }
}
