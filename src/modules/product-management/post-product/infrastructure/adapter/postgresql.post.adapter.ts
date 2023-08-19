import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { UserEntity } from 'src/modules/auth/domain/user.entity';
import { FindManyPostQueryProps } from 'src/modules/product-management/post-product/application/ports/post.repository';
import {
  CreatePostProps,
  UpdatePostProps,
} from 'src/modules/product-management/post-product/application/types/post.props';
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

  async update(
    props: UpdatePostProps,
    session?: PrismaService,
  ): Promise<PostEntity> {
    let prisma = this.prismaService;
    if (session) prisma = session;
    try {
      const rawUpdated = await prisma.post.update({
        where: { id: props.id },
        data: { title: props.title, content: props.content },
      });

      const updatedEntity = Builder<PostEntity>(PostEntity, {
        ...rawUpdated,
      }).build();
      return updatedEntity;
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }

  async findMany(props: FindManyPostQueryProps): Promise<PostEntity[]> {
    const { page, limit } = props;

    const getLimit = limit ? limit : 10;
    const getPage = page ? page : 1;
    const offset = (getPage - 1) * getLimit;

    const result = await this.prismaService.post.findMany({
      skip: offset,
      take: getLimit,
      include: {
        user: true,
      },
    });
    // console.log('masuk gak ni gan', result);

    const entity = result.map((item) => {
      const userEntity = Builder<UserEntity>(UserEntity, {
        ...item.user,
      }).build();

      return Builder<PostEntity>(PostEntity, {
        ...item,
        user: userEntity,
      }).build();
    });

    return entity;
  }

  async countMany(props: FindManyPostQueryProps): Promise<number> {
    const result = await this.prismaService.post.count();

    return result;
  }

  async deleteMany(ids: string[]): Promise<void> {
    try {
      await this.prismaService.post.deleteMany({
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
}
