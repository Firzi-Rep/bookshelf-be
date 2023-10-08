import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';
import { BaseHttpResponseDto } from 'src/core/dto/base.http.response.dto';
import { baseHttpResponseHelper } from 'src/core/helper/base.response.helper';
import {
  CreateUserCommand,
  CreateUserCommandResult,
} from 'src/modules/auth/applications/commands/create.user.command';
import { LoginUserCommand } from 'src/modules/auth/applications/commands/login.user.command';
import { BaseLoginRequestDto } from 'src/modules/auth/infrastructure/dtos/requests/base.login.request.dto';
import { LoginResponse } from 'src/modules/auth/infrastructure/dtos/response/login.response.dto';

@Controller('User')
@ApiTags('Auth')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create')
  async create(@Body() dto: BaseLoginRequestDto) {
    try {
      const command = Builder<CreateUserCommand>(CreateUserCommand, {
        // category_name: dto.name
        ...dto,
      }).build();

      const result = await this.commandBus.execute<
        CreateUserCommand,
        CreateUserCommandResult
      >(command);

      // console.log('result on controller', result);
      return {
        statusCode: 201,
        message: 'success',
        data: result.user,
      };
    } catch (e) {
      console.trace(e);
      throw e;
    }
  }

  @Post('login')
  async login(@Body() loginData: BaseLoginRequestDto): Promise<LoginResponse> {
    try {
      const { username, email, login_id, password } = loginData;

      const command = new LoginUserCommand();
      command.username = username;
      command.email = email;
      command.login_id = login_id;
      command.password = password;

      const result = await this.commandBus.execute(command);

      return {
        jwt_token: result.jwt_token,
        user: result.user,
      };
    } catch (error) {
      // Tangani kesalahan dengan baik sesuai kebutuhan Anda
      throw new HttpException('Login failed', HttpStatus.UNAUTHORIZED);
    }
  }
}
