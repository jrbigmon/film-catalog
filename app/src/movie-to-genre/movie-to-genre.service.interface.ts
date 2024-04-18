import { QueryRunner } from 'typeorm';
import { MovieGenre } from '../movie-genre/entities/movie-genre.entity';
import { MovieToGenre } from './entities/movie-to-genre.entity';

export interface IMovieToGenreService {
  removeAllByMovieId(movieId: string, queryRunner?: QueryRunner): Promise<void>;
  associateMovieToGenres(
    movieId: string,
    genres: MovieGenre[],
    queryRunner?: QueryRunner,
  ): Promise<MovieToGenre[]>;
}
