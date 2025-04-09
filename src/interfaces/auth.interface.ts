import { Request } from 'express';
import { User } from '@prisma/client';
export type SafeUser = Omit<User, 'password'>;
export interface TokenPayload {
  id: string;
  iat?: number;
  exp?: number;
}
export interface DataStoredInToken extends Pick<User, 'id'> {
  id: string;
}

export interface RequestWithUser extends Request {
  user: SafeUser;
}
