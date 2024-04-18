import { MovieToGenre } from '../entities/movie-to-genre.entity';

export interface IMovieToGenreRepository {
  create(movieId: string, genreId: string): Promise<MovieToGenre>;
  delete(movieId: string, genreId: string): Promise<void>;
  findAllBy(filter: {
    movieId?: string;
    genreId?: string;
  }): Promise<MovieToGenre[]>;
}
