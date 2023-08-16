import { Inject, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/core/utils/password.hash';
import {
  USER_REPOSITORY,
  UserRepository,
} from 'src/modules/auth/applications/ports/user.repository';
import { LoginResponse } from 'src/modules/auth/infrastructure/dtos/response/login.response.dto';

export class LoginUserCommand {
  username: string;
  login_id: string;
  password: string;
}

@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler
  implements ICommandHandler<LoginUserCommand>
{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<LoginResponse> {
    // console.log('payload on merchant login command', command);
    const {
      /* auth */
      username,
      login_id,
      password,
    } = command;

    let email: string = '';
    // Check if loginId is an email
    // Email format: <sequence of non-whitespace characters>@<sequence of non-whitespace characters>.<sequence of non-whitespace characters>
    if (/^\S+@\S+\.\S+$/.test(login_id)) email = login_id;

    // Check if loginId is a phone number
    // Phone number format: <sequence of digits>
    // if (/^\d+$/.test(login_id)) phone = login_id;

    // const hashedPassword = await hashPassword(password);

    const user = await this.userRepo.checkExistence({
      username,
      email,
    });
    // console.log(user);

    if (!user) throw new UnauthorizedException('Wrong Credentials');

    const comparedPassword = await comparePassword(password, user.password);
    if (!comparedPassword) throw new UnauthorizedException('Wrong Credentials');
    // console.log(comparedPassword);

    const jwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      jwt_token: this.jwtService.sign(jwtPayload),
      user: {
        ...user,
      },
    };
  }
}
