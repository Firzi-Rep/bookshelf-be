import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { CreatePostProps } from 'src/modules/product-management/post-product/application/types/post.props';
import { PostEntity } from 'src/modules/product-management/post-product/domain/post.entity';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostgresqlPostAdapter {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    props: CreatePostProps,
    session?: PrismaService,
  ): Promise<PostEntity> {
    let prisma = this.prismaService;
    if (session) prisma = session;
    try {
      const rawCreated = await prisma.post.create({
        data: {
          id: uuidv4(),
          title: props.title,
          content: props.content,
          userId: props.userId,
        },
      });

      const createdEntity = Builder<PostEntity>(PostEntity, {
        ...rawCreated,
      }).build();
      return createdEntity;
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }

  //    async update(props: UpdateProps, session?: PrismaService): Promise<Entity> {
  //       let prisma = this.prismaService;
  //       if (session) prisma = session;
  //       try {
  //           const rawUpdated = await prisma..update({
  //                where: {},
  //                data: {}
  //            });

  //            const updatedEntity = Builder<Entity>(
  //                Entity,
  //                {
  //                    ...rawUpdated,
  //                },
  //            ).build();
  //            return updatedEntity;
  //       } catch (error) {
  //       console.trace(error);
  //           throw error;
  //       }
  //    }

  // async findById(: string, session?: PrismaService): Promise<Entity | null> {
  //    let prisma = this.prismaService;
  //    if (session) prisma = session;
  //    try {
  //         const result = await prisma..findFirst({
  //             where: { :  },
  //         });
  //         if(!result) return null
  //        return Builder<Entity>(Entity, {
  //            ...result,
  //        }).build();
  //    } catch (error) {
  //    console.trace(error);
  //        throw error;
  //    }
  // }

  // async findMany(props: FindManyProps, session?: PrismaService): Promise<Entity[]> {
  //    let prisma = this.prismaService;
  //    if (session) prisma = session;
  //    try {
  //        const { limit = 0, page = 0, sort_by, sort_direction } = props;
  //        const offset = (page - 1) * limit;
  //        const getSortBy = sort_by ? sort_by : 'created_at';
  //        const getSortDirection = sort_direction ? sort_direction : 'desc';

  //        let queryOptions: Prisma.ProductFindManyArgs = {
  //        where: clause,

  //        orderBy: {
  //            [getSortBy]: getSortDirection,
  //        },
  // };

  //        if (limit > 0) {
  //        queryOptions = {
  //            ...queryOptions,
  //            skip: offset,
  //            take: limit,
  //        };
  // }

  //    const rawProducts = await prisma.product.findMany(queryOptions);
  //    const productEntities = rawProducts.map((rawProducts) => {
  //    return Builder<CatalogProductEntity>(CatalogProductEntity, {
  //           ...rawProducts,
  //    }).build();
  // });

  //    } catch (error) {
  //    console.trace(error);
  //        throw error;
  //    }
  // }

  // async countMany(props: FindManyProps, session?: PrismaService): Promise<number> {
  //    let prisma = this.prismaService;
  //    if (session) prisma = session;
  //    try {

  //    } catch (error) {
  //    console.trace(error);
  //        throw error;
  //    }
  // }
}
