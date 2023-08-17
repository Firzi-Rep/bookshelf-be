import { UserEntity } from 'src/modules/auth/domain/user.entity';

export class PostEntity {
  _id?: string;
  userId: string;
  title: string;
  content: string;
  user: UserEntity;
}
