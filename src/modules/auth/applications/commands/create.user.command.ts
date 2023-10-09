import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/auth/applications/ports/user.repository';
import { UserEntity } from 'src/modules/auth/domain/user.entity';
import { CreateUserDto } from 'src/modules/auth/infrastructure/dtos/create.user.dto';

export class CreateUserCommand {
  constructor(public createUserDto: CreateUserDto) {}
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
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserCommandResult> {
    const { createUserDto } = command;

    try {
      // Di sini Anda dapat melakukan validasi atau pemrosesan tambahan pada DTO jika diperlukan.

      // Selanjutnya, Anda dapat membuat pengguna dengan menggunakan UserRepository atau adapter yang sesuai.
      const newUser = await this.userRepository.create(createUserDto);

      return {
        user: newUser,
      };
    } catch (e) {
      // Tangani kesalahan dengan baik sesuai kebutuhan Anda
      console.error(e);
      throw e; // Anda dapat mengubah cara penanganan kesalahan ini sesuai kebutuhan Anda
    }
  }
}
