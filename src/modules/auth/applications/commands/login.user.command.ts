import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/auth/applications/ports/user.repository';
import { UserEntity } from 'src/modules/auth/domain/user.entity';

// Buat command untuk operasi login
export class LoginUserCommand {
  constructor(public email: string, public password: string) {}
}

// Buat class result yang akan digunakan untuk mengembalikan hasil login
export class LoginUserCommandResult {
  user: UserEntity;
  token: string;
}

// Handler untuk command login
@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler
  implements ICommandHandler<LoginUserCommand, LoginUserCommandResult>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: LoginUserCommand): Promise<LoginUserCommandResult> {
    const { email, password } = command;

    try {
      // Di sini Anda dapat memeriksa apakah pengguna dengan email yang diberikan ada di database
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new Error('Pengguna tidak ditemukan');
      }

      // Selanjutnya, Anda dapat memeriksa apakah kata sandi yang diberikan cocok dengan kata sandi yang disimpan
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        throw new Error('Kata sandi salah');
      }

      // Jika email dan kata sandi valid, Anda dapat menghasilkan token JWT di sini
      const token = 'generate-your-jwt-token-here'; // Anda harus mengganti ini dengan logika pembuatan token yang sesuai

      return {
        user,
        token,
      };
    } catch (e) {
      // Tangani kesalahan dengan baik sesuai kebutuhan Anda
      console.error(e);
      throw e; // Anda dapat mengubah cara penanganan kesalahan ini sesuai kebutuhan Anda
    }
  }
}
