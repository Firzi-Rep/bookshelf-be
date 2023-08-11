import { Body, Controller, Post, Get, Res, Query, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import {
  baseHttpResponseHelper,
  basePaginatedResponseHelper,
} from 'src/core/helper/base.response.helper';
import {
  CreateProductCommand,
  CreateProductCommandResult,
} from 'src/modules/product-management/product/application/command/create.product.command';
import {
  ProductFindManyQuery,
  ProductFindManyQueryResult,
} from 'src/modules/product-management/product/application/query/find.many.query.product';
import { CreateProductDto } from 'src/modules/product-management/product/infrastructure/dto/create.product.dto';
import { FindManyQueryProductDto } from 'src/modules/product-management/product/infrastructure/dto/find.many.query.product.dto';
import { Response } from 'express';
import { ProductDetailQuery } from 'src/modules/product-management/product/application/query/detail.query.product';

@Controller('product-management/products')
@ApiTags('Product')
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() dto: CreateProductDto) {
    try {
      // console.log("masuk ke controller create product dengan payload",dto)
      const command = Builder<CreateProductCommand>(CreateProductCommand, {
        ...dto,
      }).build();

      const result = await this.commandBus.execute<
        CreateProductCommand,
        CreateProductCommandResult
      >(command);

      return {
        statusCode: 201,
        message: 'success',
        data: result.product,
      };
    } catch (e) {
      console.trace(e);
      throw e;
    }
  }

  @Get()
  async findMany(@Res() res: Response, @Query() dto: FindManyQueryProductDto) {
    const builder = Builder<ProductFindManyQuery>(ProductFindManyQuery, {
      ...dto,
    });

    const { data, total } = await this.queryBus.execute<
      ProductFindManyQuery,
      ProductFindManyQueryResult
    >(builder.build());

    return basePaginatedResponseHelper(res, {
      data: data,
      total,
      page: dto.page,
      per_page: dto.limit,
    });
  }

  @Get(':id')
  async findById(@Res() res: Response, @Param('id') id: string) {
    try {
      const query = Builder<ProductDetailQuery>(ProductDetailQuery, {
        id,
      }).build();

      const result = await this.queryBus.execute(query);

      // console.trace("result",result)

      return baseHttpResponseHelper(res, {
        data: result,
      });
    } catch (e) {
      console.trace(e);
    }
  }
}
