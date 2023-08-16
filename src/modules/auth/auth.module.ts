import { USER_REPOSITORY } from 'src/modules/auth/applications/ports/user.repository';
import { UserPostgresqlAdapter } from 'src/modules/auth/infrastructure/adapter/user.postgresql.adapter';
import { Module, Provider } from '@nestjs/common';
import { CreateUserCommandHandler } from 'src/modules/auth/applications/commands/create.user.command';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from 'src/modules/auth/infrastructure/delivery/auth.http.controller';

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserPostgresqlAdapter,
  },
];
const commands: Provider[] = [
  CreateUserCommandHandler,
  // UpdateCategoryCommandHandler,
  // DeleteProductCommandHandler,
  //   ProductUpdateCommandHandler,
];

const queryHandlers: Provider[] = [
  CreateUserCommandHandler,
  // CategoryFindManyQueryHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [...commands, ...repositories, ...queryHandlers],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
