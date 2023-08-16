export class LoginResponse {
  jwt_token: string;
  user: {
    id?: string;
    email: string;
    user_id?: string;
    role?: string;
  };
}
