import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { IFindByFilter } from '../../utils/interfaces/find-by-filters.interface';
import { Movie } from '../entities/movie.entity';
import { IMovieRepository } from './movie.repository.interface';

export class MovieRepositoryInMemory implements IMovieRepository {
  fakeDatabase = new Array<Movie>();

  constructor(listOfMovies?: Array<Movie>) {
    if (listOfMovies) {
      this.fakeDatabase = listOfMovies;
    }
  }

  async findById(id: string): Promise<Movie> {
    return this.fakeDatabase.find(
      (movie) => movie.getId() === id && !movie.getDeletedAt(),
    );
  }

  async findByFilter(filter: IFindByFilter): Promise<Movie> {
    if (!filter) {
      return null;
    }

    const filterValue = Object.values(filter)?.[0];
    const key = Object.keys(filterValue)?.[0];

    const movie = this.fakeDatabase
      .map((movie) => movie.toJSON())
      ?.find((movie) => movie[key] === filterValue);

    if (!movie) return null;

    return this.fakeDatabase.find(
      (movieInDB) => movieInDB.getId() === movie.id,
    );
  }

  async findAll(filters?: IFindAllFilters): Promise<Movie[]> {
    return this.fakeDatabase.filter((movie) => !movie.getDeletedAt());
  }

  async create(movie: Movie): Promise<Movie> {
    movie.setCreatedAt(new Date());
    movie.setUpdatedAt(new Date());

    this.fakeDatabase.push(movie);

    return movie;
  }

  async update(id: string, movie: Movie): Promise<boolean> {
    const movieInDBIndex = this.fakeDatabase.findIndex(
      (movieGenre) => movieGenre.getId() === id,
    );

    if (movieInDBIndex === -1) return false;

    movie.setUpdatedAt(new Date());

    this.fakeDatabase[movieInDBIndex] = movie;

    return true;
  }

  async delete(id: string): Promise<void> {
    const movieInDB = this.fakeDatabase.find(
      (movieGenre) => movieGenre.getId() === id,
    );

    if (movieInDB) {
      movieInDB.setDeletedAt(new Date());
    }
  }
}
