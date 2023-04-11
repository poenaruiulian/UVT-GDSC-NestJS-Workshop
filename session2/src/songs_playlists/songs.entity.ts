import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Songs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  image: string;

  @Column()
  link: string;
}
