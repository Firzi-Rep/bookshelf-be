import { UserEntity } from 'src/modules/auth/domain/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface CreateUserProps {
  username: string;
  email?: string;
  password?: string;
  role?: string;
}
export interface UserRepository {
  create(props: CreateUserProps): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
}
