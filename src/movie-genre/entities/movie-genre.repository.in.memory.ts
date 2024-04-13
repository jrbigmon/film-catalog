import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from './movie-genre.entity';
import { MovieGenreRepository } from './movie-genre.repository.interface';

export class MovieGenreRepositoryInMemory implements MovieGenreRepository {
  fakeDatabase = new Array<MovieGenre>();

  findById(id: string): Promise<MovieGenre> {
    throw new Error('Method not implemented.');
  }
  findAll(filters?: IFindAllFilters<MovieGenre>): Promise<MovieGenre[]> {
    throw new Error('Method not implemented.');
  }
  async create(movieGenre: MovieGenre): Promise<MovieGenre> {
    movieGenre.setCreatedAt(new Date());
    movieGenre.setUpdatedAt(new Date());

    this.fakeDatabase.push(movieGenre);

    return movieGenre;
  }
  update(id: string, movieGenre: MovieGenre): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
