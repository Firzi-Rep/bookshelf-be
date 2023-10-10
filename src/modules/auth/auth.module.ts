import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { CreateUserCommandHandler } from 'src/modules/auth/applications/commands/create.user.command';
import { LoginUserCommandHandler } from 'src/modules/auth/applications/commands/login.user.command'; // Import handler login
import { USER_REPOSITORY } from 'src/modules/auth/applications/ports/user.repository';
import { UserPostgresqlAdapter } from 'src/modules/auth/infrastructure/adapter/user.postgresql.adapter';
import { UsersController } from 'src/modules/auth/infrastructure/delivery/auth.http.controller';

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserPostgresqlAdapter,
  },
];

const queryHandlers: Provider[] = [
  CreateUserCommandHandler,
  LoginUserCommandHandler, // Tambahkan handler login ke daftar queryHandlers
];

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({
      // Konfigurasi JwtModule
      secret: 'your-secret-key', // Ganti dengan kunci rahasia yang sesuai
      signOptions: { expiresIn: '1h' }, // Sesuaikan waktu kedaluwarsa
    }),
  ],
  providers: [...repositories, ...queryHandlers],
  controllers: [UsersController],
  exports: [JwtModule],
})
export class UsersModule {}
