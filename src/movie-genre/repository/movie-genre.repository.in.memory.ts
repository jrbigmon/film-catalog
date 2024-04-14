import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from '../entities/movie-genre.entity';
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

  async findAll(filters?: IFindAllFilters): Promise<MovieGenre[]> {
    const genreMovies = this.fakeDatabase.filter(
      (movieGenre) => !movieGenre.getDeletedAt(),
    );

    if (!filters?.filters) return genreMovies;

    const filtersKey = Object.keys(filters?.filters)?.[0];
    const filtersValues = Object.values(filters?.filters)?.[0];

    const listFilters = [];

    genreMovies.forEach((movieGenre) => {
      if (filtersValues.includes(movieGenre.toJSON()[filtersKey]))
        listFilters.push(movieGenre);
    });

    return listFilters;
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
