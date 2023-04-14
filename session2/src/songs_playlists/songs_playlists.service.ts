import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Songs } from './songs.entity';
import { Playlists } from './playlists.entity';
import { errorContext } from 'rxjs/internal/util/errorContext';
import {
  catchError,
  combineLatest,
  forkJoin,
  from,
  map,
  mergeMap,
  of,
  tap,
  toArray,
} from 'rxjs';
import { Repository } from 'typeorm';

@Injectable()
export class Songs_playlistsService {
  constructor(
    @InjectRepository(Songs) private songsRepo,
    @InjectRepository(Playlists) private playlistRepo: Repository<Playlists>,
  ) {}

  createSong(song) {
    console.log(song);
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
    const show = from(this.playlistRepo.findBy({ avalible: true })).pipe(
      mergeMap((playlists) => playlists.map((p) => p)),
      mergeMap((playlist) =>
        combineLatest([
          of(playlist.id),
          of(playlist.name),
          forkJoin<Songs[]>(
            playlist.songs.map((songId) =>
              this.songsRepo.findOneBy({ id: songId }),
            ),
          ),
        ]),
      ),
      map(([id, name, songs]) => ({
        id: id,
        playlist: name,
        songs: songs.length != 0 ? songs.map((s) => s.title) : [],
      })),
      toArray(),
    );
    return show;
  }

  getSongs(id) {
    const show = this.playlistRepo.findOneBy({ id: id }).then((playlist) => {
      console.log(playlist.songs);
      return forkJoin<Songs[]>(
        playlist.songs.map((songId) =>
          this.songsRepo.findOneBy({ id: songId }),
        ),
      );
    });
    return show;
  }

  returnLibrary() {
    const show = this.songsRepo.findBy({ get: true }).then((resp) => {
      return resp;
    });

    return show;
  }
}
