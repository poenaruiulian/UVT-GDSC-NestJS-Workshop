import { Module } from '@nestjs/common';


// import { UsersModule } from './users/users.module';
import {Songs_playlistsModule} from "./songs_playlists/songs_playlists.module";

import * as ormconfig from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), Songs_playlistsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
