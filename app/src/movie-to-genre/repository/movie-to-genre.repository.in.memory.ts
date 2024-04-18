import { QueryRunner } from 'typeorm';
import { MovieToGenre } from '../entities/movie-to-genre.entity';
import { IMovieToGenreRepository } from './movie-to-genre.repository.interface';

export class MovieToGenreRepositoryInMemory implements IMovieToGenreRepository {
  fakeDatabase = new Array<MovieToGenre>();

  async create(
    movieId: string,
    genreId: string,
    queryRunner?: QueryRunner,
  ): Promise<MovieToGenre> {
    const movieToGenre = new MovieToGenre(movieId, genreId);
    this.fakeDatabase.push(movieToGenre);
    return movieToGenre;
  }

  async delete(
    movieId: string,
    genreId: string,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    const movieToGenreIndex = this.fakeDatabase.findIndex(
      (movieToGenre) =>
        movieToGenre.getGenreId() === genreId &&
        movieToGenre.getMovieId() === movieId,
    );

    if (movieToGenreIndex !== -1) {
      this.fakeDatabase.splice(movieToGenreIndex, 1);
    }
  }

  async findAllBy(
    filter: { movieId?: string; genreId?: string },
    queryRunner?: QueryRunner,
  ): Promise<MovieToGenre[]> {
    const { genreId, movieId } = filter;

    if (!movieId && !genreId) return this.fakeDatabase;

    if (movieId && genreId) {
      return this.fakeDatabase.filter(
        (movieToGenre) =>
          movieToGenre.getGenreId() === genreId &&
          movieToGenre.getMovieId() === movieId,
      );
    }
    const [key, value] = Object.entries(filter)[0];

    return this.fakeDatabase.filter(
      (movieToGenre) => movieToGenre.toJSON()[key] === value,
    );
  }
}
