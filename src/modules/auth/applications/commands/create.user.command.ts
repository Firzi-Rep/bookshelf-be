import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { USER_REPOSITORY } from 'src/modules/auth/applications/ports/user.repository';
import { UserEntity } from 'src/modules/auth/domain/user.entity';
import { UserPostgresqlAdapter } from 'src/modules/auth/infrastructure/adapter/user.postgresql.adapter';

export class CreateUserCommand {
  username: string;
  email: string;
  password: string;
}

export class CreateUserCommandResult {
  user: UserEntity;
}

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand, CreateUserCommandResult>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userPostgresqlAdapter: UserPostgresqlAdapter,
  ) {}

  async execute(command: CreateUserCommand) {
    // console.log('masuk command product create ni bos wkwkwk' )

    const result = await this.userPostgresqlAdapter.create({ ...command });

    return {
      user: result,
    };
  }
}
