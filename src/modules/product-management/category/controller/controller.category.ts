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
import { Builder } from 'builder-pattern';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CategoryCreateCommand,
  CategoryCreateCommandResult,
} from 'src/modules/product-management/category/command/create.command.category';
import { CategoryCreateDto } from 'src/modules/product-management/category/dto/create.category.dto';
import { CategoryFindManyQueryDto } from 'src/modules/product-management/category/dto/find.many.category.dto';
import {
  CategoryFindManyQuery,
  CategoryFindManyQueryResult,
} from 'src/modules/product-management/category/queries/category.find.many.query';
import {
  baseHttpResponseHelper,
  basePaginatedResponseHelper,
} from 'src/core/helper/base.response.helper';
import { Response } from 'express';
import { CategoryUpdateDto } from 'src/modules/product-management/category/dto/update.category.dto';
import {
  UpdateCategoryCommand,
  UpdateCategoryCommandResult,
} from 'src/modules/product-management/category/command/update.category.command';

@Controller('product-management/category')
@ApiTags('Category')
export class CategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  async create(@Body() dto: CategoryCreateDto) {
    try {
      const command = Builder<CategoryCreateCommand>(CategoryCreateCommand, {
        // category_name: dto.name
        ...dto,
      }).build();

      const result = await this.commandBus.execute<
        CategoryCreateCommand,
        CategoryCreateCommandResult
      >(command);

      // console.log('result on controller', result);
      return {
        statusCode: 201,
        message: 'success',
        data: result.category,
      };
    } catch (e) {
      console.trace(e);
      throw e;
    }
  }

  @Get()
  async findMany(@Res() res: Response, @Query() dto: CategoryFindManyQueryDto) {
    const builder = Builder<CategoryFindManyQuery>(CategoryFindManyQuery, {
      ...dto,
    });

    const { data, total } = await this.queryBus.execute<
      CategoryFindManyQuery,
      CategoryFindManyQueryResult
    >(builder.build());

    return basePaginatedResponseHelper(res, {
      data: data,
      // total,
      // page: dto.page,
      // per_page: dto.limit,
    });
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Body() dto: CategoryUpdateDto,
    @Param('id') id: string,
  ) {
    try {
      const command = Builder<UpdateCategoryCommand>(UpdateCategoryCommand, {
        ...dto,
        id,
      }).build();

      const result = await this.commandBus.execute<
        UpdateCategoryCommand,
        UpdateCategoryCommandResult
      >(command);

      return baseHttpResponseHelper(res, {
        data: result,
      });
    } catch (e) {
      throw e;
    }
  }

  // @Post('delete-many')
  // async deleteMany(@Body() dto: CategoryDeleteManyDto) {
  //   // console.log("masuk ke controller create product dengan payload",dto)
  //   const command = Builder<CategoryDeleteCommand>(CategoryDeleteCommand, {
  //     ...dto,
  //   }).build();

  //   await this.commandBus.execute<
  //     CategoryDeleteCommand,
  //     CategoryDeleteCommandResult
  //   >(command);

  //   return {
  //     statusCode: 200,
  //     message: 'success',
  //     data: null,
  //   };
}
