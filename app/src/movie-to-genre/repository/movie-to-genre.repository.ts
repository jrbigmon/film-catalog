import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieToGenreRepositoryTypeOrm } from './movie-to-genre.repository.type.orm';
import { Injectable } from '@nestjs/common';
import { IMovieToGenreRepository } from './movie-to-genre.repository.interface';
import { MovieToGenre } from '../entities/movie-to-genre.entity';

@Injectable()
export class MovieToGenreRepository implements IMovieToGenreRepository {
  constructor(
    @InjectRepository(MovieToGenreRepositoryTypeOrm)
    private readonly movieToGenreRepository: Repository<MovieToGenreRepositoryTypeOrm>,
  ) {}

  public async create(movieId: string, genreId: string): Promise<MovieToGenre> {
    const movieToGenreInDB = await this.movieToGenreRepository.findOneBy({
      movieId,
      genreId,
    });

    if (movieToGenreInDB) {
      return new MovieToGenre(
        movieToGenreInDB.movieId,
        movieToGenreInDB.genreId,
      );
    }

    const movieToGenreCreated = await this.movieToGenreRepository.save({
      movieId,
      genreId,
    });

    return new MovieToGenre(
      movieToGenreCreated.movieId,
      movieToGenreCreated.genreId,
    );
  }

  public async delete(movieId: string, genreId: string): Promise<void> {
    const movieToGenreInDB = await this.movieToGenreRepository.findOneBy({
      movieId,
      genreId,
    });

    if (movieToGenreInDB) {
      await this.movieToGenreRepository.delete(movieToGenreInDB);
    }
  }

  public async findAllBy(filter: {
    movieId?: string;
    genreId?: string;
  }): Promise<MovieToGenre[]> {
    if (!filter) return;

    const moviesToGenres = await this.movieToGenreRepository.find({
      where: { ...filter },
    });

    return moviesToGenres?.map(
      (movieToGenre) =>
        new MovieToGenre(movieToGenre.movieId, movieToGenre.genreId),
    );
  }
}
