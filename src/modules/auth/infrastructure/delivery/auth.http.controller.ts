import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserCommand,
  CreateUserCommandResult,
} from 'src/modules/auth/applications/commands/create.user.command';
import { CreateUserDto } from 'src/modules/auth/infrastructure/dtos/create.user.dto';

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
}
