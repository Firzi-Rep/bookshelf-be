import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { Builder } from 'builder-pattern';
import {
  CheckUserExistenceProps,
  CreateUserProps,
  UserRepository,
} from 'src/modules/auth/applications/ports/user.repository';
import { UserEntity } from 'src/modules/auth/domain/user.entity';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';

const { v4: uuidv4 } = require('uuid');
import { hash } from 'bcrypt';

@Injectable()
export class UserPostgresqlAdapter implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    props: CreateUserProps,
    session?: PrismaService,
  ): Promise<UserEntity> {
    let prisma = this.prismaService;
    if (session) prisma = session;
    try {
      const hashedPassword = await hash(props.password, 10);
      const rawCreated = await prisma.user.create({
        data: {
          id: uuidv4(),
          username: props.username,
          email: props.email,
          role: Role.USER,
          password: hashedPassword,
        },
      });

      const createdEntity = Builder<UserEntity>(UserEntity, {
        ...rawCreated,
      }).build();

      //  console.log("created entity",createdEntity)
      return createdEntity;
    } catch (error) {
      console.trace(error);
      throw error;
    }
  }

  async checkExistence(props: CheckUserExistenceProps): Promise<UserEntity> {
    try {
      const { email, username, excluded_id } = props;
      const clause: Prisma.UserWhereInput = {};

      const orClause: Prisma.UserWhereInput[] = [];
      if (email && email !== '') orClause.push({ email });
      if (username && username !== '') orClause.push({ username });
      clause.OR = orClause;

      if (excluded_id) {
        clause.id = {
          notIn: [excluded_id],
        };
      }

      // console.log('clause', clause);
      const result = await this.prismaService.user.findFirst({
        where: clause,
      });

      if (result) return Builder<UserEntity>(UserEntity, result).build();

      return null;
    } catch (err) {
      throw err;
    }
  }
}
