export type SafeUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserRole = 'ADMIN' | 'USER';

export type JwtUserPayload = {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
};
