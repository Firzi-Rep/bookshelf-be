import * as bcrypt from 'bcrypt';

export class UserEntity {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  // Post: PostEntity;
  // profileImage?: ProfileImageEntity[];

  // Metode untuk membandingkan kata sandi yang diberikan dengan kata sandi yang dihash
  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
