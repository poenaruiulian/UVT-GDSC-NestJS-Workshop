import { DataSourceOptions } from 'typeorm';
//import { User } from './users/users.entity';
import { Songs } from './songs_playlists/songs.entity';
import { Playlists } from './songs_playlists/playlists.entity';

const config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'songs_playlists',
  entities: [Songs, Playlists],
  synchronize: true,
};

export = config;
