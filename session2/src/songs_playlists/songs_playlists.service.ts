import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Songs } from './songs.entity';
import { Playlists } from './playlists.entity';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { catchError } from 'rxjs';

@Injectable()
export class Songs_playlistsService {
  constructor(
    @InjectRepository(Songs) private songsRepo,
    @InjectRepository(Playlists) private playlistRepo,
  ) {}

  createSong(song) {
    const newSong = this.songsRepo.create(song);
    console.log(newSong);
    return this.songsRepo.save(newSong);
  }

  createPlaylist(playlist) {
    const newPlaylist = this.playlistRepo.create(playlist);
    console.log(newPlaylist);
    return this.playlistRepo.save(newPlaylist);
  }

  addSong(idPlaylist, idSong) {
    const songToAdd = this.songsRepo
      .findOneBy({ id: idSong })
      .then((resSong) => {
        const playlistToUpdate = this.playlistRepo
          .findOneBy({ id: idPlaylist })
          .then((resPlaylist) => {
            if (resPlaylist == null) {
              return null;
            }
            resPlaylist.songs.push(resSong.id);
            this.playlistRepo.update(idPlaylist, resPlaylist);
            return 'Song added with success!';
          });

        if (resSong == null) {
          return null;
        } else {
          return playlistToUpdate;
        }
      });
    return songToAdd;
  }

  removeSongFromPlaylist(idP, idS) {
    const songToRemove = this.songsRepo
      .findOneBy({ id: idS })
      .then((resSong) => {
        if (resSong == null) {
          return null;
        }
        const playlistToUpdate = this.playlistRepo
          .findOneBy({ id: idP })
          .then((resPlaylist) => {
            if (resPlaylist == null) {
              return null;
            }
            if (resPlaylist.songs.find((el) => el == idS) == undefined) {
              return null;
            }
            resPlaylist.songs = resPlaylist.songs.filter((id) => id != idS);
            this.playlistRepo.update(idP, resPlaylist);

            return 'Elminated with succes';
          });
        return playlistToUpdate;
      });
    return songToRemove;
  }

  avalible_playlists() {
    const show = this.playlistRepo.findBy({ avalible: true }).then((RES) => {
      const result = [];
      RES.forEach((res) => {
        //todo cum fac sa pot face ce e aici jos?
        const songsToShow = [];
        console.log(res);
        res.songs.forEach((id) => {
          const songs = this.songsRepo
            .findOneBy({ id: Number(id) })
            .then((res) => {
              return res.title;
            })
            .then((title) => {
              songsToShow.push(title);
            });
        });
        result.push({
          name: res.name,
          //songs: songsToShow,
          songs: res.songs,
        });
      });
      console.log(result);
      return result;
    });
    return show;
  }

  getSongs(id) {
    const show = this.playlistRepo.findOneBy({ id: id }).then((res) => {
      const songs = this.songsRepo.findBy(res.songs.includes(id));
      return songs;
    });
    return show;
  }
}
