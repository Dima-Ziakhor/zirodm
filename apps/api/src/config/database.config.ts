import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  pg: {
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    db: process.env.PGDATABASE,
  },
}));
