import { Inject, Injectable } from '@nestjs/common';
import { IMovieToGenreRepository } from './repository/movie-to-genre.repository.interface';
import { MovieGenre } from '../movie-genre/entities/movie-genre.entity';
import { MovieToGenre } from './entities/movie-to-genre.entity';
import { QueryRunner } from 'typeorm';

@Injectable()
export class MovieToGenreService {
  constructor(
    @Inject('MovieToGenreRepository')
    private readonly movieToGenreRepository: IMovieToGenreRepository,
  ) {}

  public async removeAllByMovieId(
    movieId: string,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    if (!movieId) return;

    const genres = await this.movieToGenreRepository.findAllBy(
      { movieId },
      queryRunner,
    );

    if (!genres?.length) return;

    await Promise.all(
      genres?.map((genre) =>
        this.movieToGenreRepository.delete(
          movieId,
          genre.getGenreId(),
          queryRunner,
        ),
      ),
    );
  }

  public async associateMovieToGenres(
    movieId: string,
    genres: MovieGenre[],
    queryRunner?: QueryRunner,
  ): Promise<MovieToGenre[]> {
    if (!genres?.length) return [];

    await this.removeAllByMovieId(movieId, queryRunner);

    return await Promise.all(
      genres?.map((genre) =>
        this.movieToGenreRepository.create(movieId, genre.getId(), queryRunner),
      ),
    );
  }
}
