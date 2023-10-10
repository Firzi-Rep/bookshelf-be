import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  CreateUserCommand,
  CreateUserCommandResult,
} from 'src/modules/auth/applications/commands/create.user.command';
import {
  LoginUserCommand,
  LoginUserCommandResult,
} from 'src/modules/auth/applications/commands/login.user.command';
import { CreateUserDto } from 'src/modules/auth/infrastructure/dtos/create.user.dto';
import { BaseLoginRequestDto } from 'src/modules/auth/infrastructure/dtos/requests/base.login.request.dto';

@Controller('users')
@ApiTags('Authentication')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      // Kirim perintah untuk membuat pengguna
      const createUserCommand = new CreateUserCommand(createUserDto);
      const result: CreateUserCommandResult = await this.commandBus.execute(
        createUserCommand,
      );

      // Jika berhasil membuat pengguna, Anda dapat mengembalikan respons yang sesuai
      if (result.user) {
        return {
          statusCode: HttpStatus.CREATED,
          message: 'User created successfully',
          user: result.user,
        };
      } else {
        // Tangani kasus gagal pembuatan pengguna
        throw new HttpException(
          'User creation failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (e) {
      // Tangani kesalahan dengan baik sesuai kebutuhan Anda
      console.error(e);
      throw new HttpException(
        'User creation failed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  @ApiBody({ type: BaseLoginRequestDto }) // Menggunakan DTO sebagai tipe body request
  async loginUser(
    @Body() loginData: BaseLoginRequestDto,
  ): Promise<LoginUserCommandResult> {
    const { username, password } = loginData;

    // Kirim command login ke CommandBus untuk ditangani oleh handler
    const result = await this.commandBus.execute(
      new LoginUserCommand(username, password),
    );

    return result;
  }
}
