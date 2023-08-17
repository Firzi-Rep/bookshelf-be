import { UserEntity } from 'src/modules/auth/domain/user.entity';

export interface CreatePostProps {
  id: string;
  userId: string;
  title: string;
  content: string;
  user: UserEntity;
}
