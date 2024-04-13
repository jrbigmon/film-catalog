import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from './movie-genre.entity';
import { IMovieGenreRepository } from './movie-genre.repository.interface';

export class MovieGenreRepositoryInMemory implements IMovieGenreRepository {
  fakeDatabase = new Array<MovieGenre>();

  constructor(listOfMovieGenres?: Array<MovieGenre>) {
    if (listOfMovieGenres) {
      this.fakeDatabase = listOfMovieGenres;
    }
  }

  async findById(id: string): Promise<MovieGenre> {
    return this.fakeDatabase.find(
      (movieGenre) => movieGenre.getId() === id && !movieGenre.getDeletedAt(),
    );
  }

  async findAll(filters?: IFindAllFilters<MovieGenre>): Promise<MovieGenre[]> {
    return this.fakeDatabase;
  }

  async create(movieGenre: MovieGenre): Promise<MovieGenre> {
    movieGenre.setCreatedAt(new Date());
    movieGenre.setUpdatedAt(new Date());

    this.fakeDatabase.push(movieGenre);

    return movieGenre;
  }

  async update(id: string, movieGenre: MovieGenre): Promise<boolean> {
    const movieGenreInDBIndex = this.fakeDatabase.findIndex(
      (movieGenre) => movieGenre.getId() === id,
    );

    if (movieGenreInDBIndex === -1) return false;

    movieGenre.setUpdatedAt(new Date());

    this.fakeDatabase[movieGenreInDBIndex] = movieGenre;

    return true;
  }

  async delete(id: string): Promise<void> {
    const movieGenreInDB = this.fakeDatabase.find(
      (movieGenre) => movieGenre.getId() === id,
    );

    if (movieGenreInDB) {
      movieGenreInDB.setDeletedAt(new Date());
    }
  }
}
