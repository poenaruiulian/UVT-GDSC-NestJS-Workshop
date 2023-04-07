import {
  Post,
  Body,
  Controller,
  Param,
  Patch,
  HttpException,
  Get,
} from '@nestjs/common';
import { Songs_playlistsService } from './songs_playlists.service';

@Controller('songs_playlists')
export class Songs_playlistsController {
  constructor(
    private readonly songs_playlistsService: Songs_playlistsService,
  ) {}

  @Post('create_song')
  async createSong(@Body() song) {
    return await this.songs_playlistsService.createSong(song);
  }

  @Post('create_playlist')
  async createPlaylist(@Body() playlist) {
    return await this.songs_playlistsService.createPlaylist(playlist);
  }

  @Patch('updatePlaylist/:idP/song/:idS')
  async addSong(@Param('idP') idP, @Param('idS') idS) {
    const update = await this.songs_playlistsService.addSong(idP, idS);
    if (update == null) {
      throw new HttpException('Something went wrong', 404);
    } else {
      return update;
    }
  }

  @Patch('removeFromPlaylist/:idP/song/:idS')
  async removeSongFromPlaylist(@Param('idP') idP, @Param('idS') idS) {
    const remove = await this.songs_playlistsService.removeSongFromPlaylist(
      idP,
      idS,
    );
    if (remove == null) {
      throw new HttpException('Something went wrong', 404);
    } else {
      return remove;
    }
  }

  @Get('avalible_playlists')
  async avalible_playlists() {
    return await this.songs_playlistsService.avalible_playlists();
  }

  @Get('songsFromPlaylists/:id')
  async getSongs(@Param('id') id) {
    return await this.songs_playlistsService.getSongs(id);
  }
}
