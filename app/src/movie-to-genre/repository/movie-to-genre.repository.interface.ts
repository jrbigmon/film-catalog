import { QueryRunner } from 'typeorm';
import { MovieToGenre } from '../entities/movie-to-genre.entity';

export interface IMovieToGenreRepository {
  create(
    movieId: string,
    genreId: string,
    queryRunner?: QueryRunner,
  ): Promise<MovieToGenre>;
  delete(
    movieId: string,
    genreId: string,
    queryRunner?: QueryRunner,
  ): Promise<void>;
  findAllBy(
    filter: {
      movieId?: string;
      genreId?: string;
    },
    queryRunner?: QueryRunner,
  ): Promise<MovieToGenre[]>;
}
