import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { IFindByFilter } from '../../utils/interfaces/find-by-filters.interface';
import { Movie } from '../entities/movie.entity';

export interface IMovieRepository {
  findById(id: string): Promise<Movie>;
  findByFilter(filter: IFindByFilter): Promise<Movie>;
  findAll(filters?: IFindAllFilters): Promise<Movie[]>;
  create(movie: Movie): Promise<Movie>;
  update(id: string, movie: Movie): Promise<boolean>;
  delete(id: string): Promise<void>;
}
