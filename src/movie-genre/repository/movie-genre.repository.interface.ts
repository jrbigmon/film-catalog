import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from '../entities/movie-genre.entity';

export interface IMovieGenreRepository {
  findById(id: string): Promise<MovieGenre>;
  findAll(filters?: IFindAllFilters): Promise<MovieGenre[]>;
  create(movieGenre: MovieGenre): Promise<MovieGenre>;
  update(id: string, movieGenre: MovieGenre): Promise<boolean>;
  delete(id: string): Promise<void>;
}
