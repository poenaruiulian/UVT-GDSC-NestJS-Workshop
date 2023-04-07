import { Module } from '@nestjs/common';
import { Songs_playlistsService } from './songs_playlists.service';
import { Songs_playlistsController } from './songs_playlists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Songs } from './songs.entity';
import { Playlists } from './playlists.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Songs, Playlists])],
  controllers: [Songs_playlistsController],
  providers: [Songs_playlistsService],
})
export class Songs_playlistsModule {}
