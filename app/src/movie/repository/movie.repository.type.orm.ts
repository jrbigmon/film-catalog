import { MovieGenreRepositoryTypeOrm } from 'src/movie-genre/repository/movie-genre.repository.type.orm';
import { MovieToGenreRepositoryTypeOrm } from 'src/movie-to-genre/repository/movie-to-genre.repository.type.orm';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
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

  @OneToMany(
    () => MovieToGenreRepositoryTypeOrm,
    (movieToGenre) => movieToGenre.movie,
  )
  public movieToGenre: MovieToGenreRepositoryTypeOrm[];

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

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
