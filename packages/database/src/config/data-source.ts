import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity.js';
import { Users1788379071314 } from '../migrations/1788379071314-users.js';

export default new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: [User],
  migrations: [Users1788379071314],
  synchronize: false,
  migrationsTransactionMode: 'all',
});
