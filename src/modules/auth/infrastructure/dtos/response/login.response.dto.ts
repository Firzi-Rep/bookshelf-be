export class LoginResponseDto {
  accessToken: string;
  user: {
    id?: string;
    email: string;
    user_id?: string;
    role?: string;
  };
}
