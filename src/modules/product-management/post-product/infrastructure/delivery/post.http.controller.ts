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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { Response } from 'express';
import { baseHttpResponseHelper } from 'src/core/helper/base.response.helper';
import {
  CreatePostCommand,
  CreatePostCommandResult,
} from 'src/modules/product-management/post-product/application/commands/create.post.command';
import {
  UpdatePostCommand,
  UpdatePostCommandResult,
} from 'src/modules/product-management/post-product/application/commands/update.post.command';
import { CreatePostDto } from 'src/modules/product-management/post-product/infrastructure/dto/create.post.dto';
import { UpdatePostDto } from 'src/modules/product-management/post-product/infrastructure/dto/update.post.dto';

@Controller('product-management/post')
@ApiTags('Post')
export class PostController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  async create(@Res() res: Response, @Body() dto: CreatePostDto) {
    try {
      const command = Builder<CreatePostCommand>(CreatePostCommand, {
        ...dto,
      }).build();

      const result = await this.commandBus.execute<
        CreatePostCommand,
        CreatePostCommandResult
      >(command);

      return baseHttpResponseHelper(res, {
        data: result,
        message: ' Created Successfully!',
        statusCode: HttpStatus.CREATED,
      });
    } catch (e) {
      throw e;
    }
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Body() dto: UpdatePostDto,
    @Param('id') id: string,
  ) {
    try {
      const command = Builder<UpdatePostCommand>(UpdatePostCommand, {
        ...dto,
        id,
      }).build();

      const result = await this.commandBus.execute<
        UpdatePostCommand,
        UpdatePostCommandResult
      >(command);

      return baseHttpResponseHelper(res, {
        data: result,
      });
    } catch (e) {
      throw e;
    }
  }

  //   @Get()
  //   async findMany(
  //     @Res() res: Response,
  //     @Query() dto: FindManyQueryDto,
  //   ) {
  //     const { page, limit } = dto;

  //     const responseBuilder = Builder<
  //       BaseHttpPaginatedResponseDto<Entity[], any>
  //     >(BaseHttpPaginatedResponseDto);
  //     responseBuilder.statusCode(200);
  //     responseBuilder.message(' List Fetched Successfully!');

  //     const builder = Builder<FindManyQuery>(
  //       FindManyQuery,
  //       {
  //         ...dto,
  //       },
  //     );

  //     const { result, total } = await this.queryBus.execute<
  //       FindManyQuery,
  //       FindManyQueryResult
  //     >(builder.build());

  //     responseBuilder.data(result);
  //     responseBuilder.page(page);
  //     responseBuilder.per_page(limit);
  //     responseBuilder.total(total);

  //     return basePaginatedResponseHelper(res, responseBuilder.build());
  //   }

  //   @Get(':id')
  //   async findById(@Res() res: Response, @Param('id') id: string) {
  //     const responseBuilder =
  //       Builder<BaseHttpResponseDto<Entity, any>>(
  //         BaseHttpResponseDto,
  //       );
  //     responseBuilder.statusCode(200);
  //     responseBuilder.message(' Fetched Successfully');

  //     const query = Builder<FindByIdQuery>(
  //       FindByIdQuery,
  //       {
  //         id,
  //       },
  //     ).build();

  //     const result = await this.queryBus.execute(query);

  //     responseBuilder.data(result);

  //     return baseHttpResponseHelper(res, responseBuilder.build());
  //   }

  //   @UseGuards(TenderJwtGuard)
}
