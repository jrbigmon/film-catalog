import { MovieGenre } from 'src/movie-genre/entities/movie-genre.entity';
import { MovieGenreRepositoryTypeOrm } from 'src/movie-genre/repository/movie-genre.repository.type.orm';
import { MovieToGenreTypeOrm } from 'src/movie-to-genre/repository/movie-to-genre.repository.type.orm';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity({
  name: 'movie',
})
export class MovieRepositoryTypeOrm {
  @PrimaryColumn()
  public id: string;

  @Column()
  public title: string;

  @ManyToMany(() => MovieGenreRepositoryTypeOrm, (genre) => genre.movies)
  public genres: MovieGenreRepositoryTypeOrm[];

  @OneToMany(() => MovieToGenreTypeOrm, (movieToGenre) => movieToGenre.movie)
  public movieToGenre: MovieToGenreTypeOrm[];

  @Column()
  public director: string;

  @Column()
  public releaseYear: number;

  @Column()
  public durationMinutes: number;

  @Column()
  public rating: number;

  @Column()
  public language: string;

  @Column()
  public country: string;

  @Column()
  public synopsis?: string;

  @Column()
  public posterURL?: string;

  @CreateDateColumn()
  public createdAt: Date;

  @CreateDateColumn()
  public updatedAt: Date;

  @CreateDateColumn()
  public deletedAt?: Date;
}
