import { envSchema } from './env.validation';

export const validateEnv = () => {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error('❌ Invalid environment variables');
    console.error(parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
};
