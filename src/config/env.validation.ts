import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z.coerce.number().default(5000),

  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default('1d'),

  //   DB_HOST: z.string().min(1),
  //   DB_PORT: z.coerce.number().default(5432),
  //   DB_USER: z.string().min(1),
  //   DB_PASSWORD: z.string().min(1),
  //   DB_NAME: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
