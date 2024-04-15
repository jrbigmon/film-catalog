import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieToGenreRepositoryTypeOrm } from './movie-to-genre.repository.type.orm';
import { Injectable } from '@nestjs/common';
import { MovieGenre } from 'src/movie-genre/entities/movie-genre.entity';

@Injectable()
export class MovieToGenreRepository {
  constructor(
    @InjectRepository(MovieToGenreRepositoryTypeOrm)
    private readonly movieToGenreRepository: Repository<MovieToGenreRepositoryTypeOrm>,
  ) {}

  public async create(
    movieId: string,
    genreId: string,
  ): Promise<MovieToGenreRepositoryTypeOrm> {
    const movieToGenreInDB = await this.movieToGenreRepository.findOneBy({
      movieId,
      genreId,
    });

    if (movieToGenreInDB) {
      return movieToGenreInDB;
    }

    const movieToGenreCreated = await this.movieToGenreRepository.save({
      movieId,
      genreId,
    });

    return movieToGenreCreated;
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

  public async removeAllByMovieId(movieId: string): Promise<void> {
    if (!movieId) return;

    const genres = await this.movieToGenreRepository.find({
      where: { movieId },
    });

    if (!genres?.length) return;

    await Promise.all(
      genres?.map((genre) => this.delete(movieId, genre.genreId)),
    );
  }

  public async associateMovieToGenres(
    movieId: string,
    genres: MovieGenre[],
  ): Promise<MovieToGenreRepositoryTypeOrm[]> {
    if (!genres?.length) return [];

    await this.removeAllByMovieId(movieId);

    return await Promise.all(
      genres?.map((genre) => this.create(movieId, genre.getId())),
    );
  }
}
