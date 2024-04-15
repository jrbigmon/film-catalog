import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from '../entities/movie-genre.entity';
import { IMovieGenreRepository } from './movie-genre.repository.interface';

export class MovieGenreRepository implements IMovieGenreRepository {
  findById(id: string): Promise<MovieGenre> {
    throw new Error('Method not implemented.');
  }
  findAll(filters?: IFindAllFilters): Promise<MovieGenre[]> {
    throw new Error('Method not implemented.');
  }
  create(movieGenre: MovieGenre): Promise<MovieGenre> {
    throw new Error('Method not implemented.');
  }
  update(id: string, movieGenre: MovieGenre): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
