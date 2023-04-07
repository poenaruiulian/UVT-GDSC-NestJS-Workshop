import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Songs } from './songs.entity';

@Entity()
export class Playlists {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // @OneToMany(() => Songs, (song) => song.id)
  // songs: Songs[];

  @Column('simple-array')
  songs: number[];

  @Column({default:true})
  avalible:boolean
}
