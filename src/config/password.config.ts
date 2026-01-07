import { registerAs } from '@nestjs/config';

export default registerAs('password', () => ({
  saltOrRounds: parseInt(process.env.BYCRYPT_SALT_OR_ROUNDS || '10', 10),
}));
