import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  mode: process.env.NODE_ENV,
  port: Number(process.env.PORT),
}));
