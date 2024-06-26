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
    const key = Object.keys(filter)?.[0];

    const movieInDBIndex = this.fakeDatabase
      .map((movie) => movie.toJSON())
      ?.findIndex((movie) => movie[key] === filterValue);

    if (movieInDBIndex === -1) return null;

    return this.fakeDatabase[movieInDBIndex];
  }

  async findAll(
    filters?: IFindAllFilters,
  ): Promise<{ count: number; movies: Movie[] }> {
    return {
      count: this.fakeDatabase.length,
      movies: this.fakeDatabase.filter((movie) => !movie.getDeletedAt()),
    };
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
