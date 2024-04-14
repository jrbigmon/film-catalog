import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from '../entities/movie-genre.entity';
import { IMovieGenre } from '../entities/movie-genre.interface';

export interface IMovieGenreRepository {
  findById(id: string): Promise<MovieGenre>;
  findAll(filters?: IFindAllFilters<IMovieGenre>): Promise<MovieGenre[]>;
  create(movieGenre: MovieGenre): Promise<MovieGenre>;
  update(id: string, movieGenre: MovieGenre): Promise<boolean>;
  delete(id: string): Promise<void>;
}
