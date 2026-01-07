export type SafeUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};
