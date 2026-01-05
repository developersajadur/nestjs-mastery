import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  db_url: process.env.DATABASE_URL,
}));
