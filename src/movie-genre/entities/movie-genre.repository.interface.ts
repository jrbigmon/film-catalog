import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from './movie-genre.entity';

export interface MovieGenreRepository {
  findById(id: string): Promise<MovieGenre>;
  findAll(filters?: IFindAllFilters<MovieGenre>): Promise<MovieGenre[]>;
  create(movieGenre: MovieGenre): Promise<MovieGenre>;
  update(id: string, movieGenre: MovieGenre): Promise<boolean>;
  delete(id: string): Promise<void>;
}
