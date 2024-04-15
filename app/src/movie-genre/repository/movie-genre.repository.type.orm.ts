import { MovieToGenreTypeOrm } from 'src/movie-to-genre/repository/movie-to-genre.repository.type.orm';
import { MovieRepositoryTypeOrm } from 'src/movie/repository/movie.repository.type.orm';
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
  name: 'movie-genre',
})
export class MovieGenreRepositoryTypeOrm {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  @OneToMany(() => MovieToGenreTypeOrm, (movieToGenre) => movieToGenre.genre)
  public movieToGenre: MovieToGenreTypeOrm[];

  @ManyToMany(() => MovieRepositoryTypeOrm, (movie) => movie.genres)
  public movies: MovieRepositoryTypeOrm[];
}
