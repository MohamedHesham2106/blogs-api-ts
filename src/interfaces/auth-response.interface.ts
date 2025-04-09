import { SafeUser } from './auth.interface';

export interface LoginResponse {
  accessToken: string;
}

export interface RegisterResponse {
  user: SafeUser;
}
