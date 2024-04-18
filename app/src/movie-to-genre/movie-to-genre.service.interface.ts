import { MovieGenre } from '../movie-genre/entities/movie-genre.entity';
import { MovieToGenre } from './entities/movie-to-genre.entity';

export interface IMovieToGenreService {
  removeAllByMovieId(movieId: string): Promise<void>;
  associateMovieToGenres(
    movieId: string,
    genres: MovieGenre[],
  ): Promise<MovieToGenre[]>;
}
