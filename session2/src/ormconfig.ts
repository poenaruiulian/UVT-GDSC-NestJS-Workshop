import { DataSourceOptions } from 'typeorm';
import { User } from './users/users.entity';

const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'users_module',
  entities: ['./users/users.entity.ts', User],
  synchronize: true,
};

export = config;
