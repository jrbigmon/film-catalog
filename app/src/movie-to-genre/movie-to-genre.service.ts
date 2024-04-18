import { Inject, Injectable } from '@nestjs/common';
import { IMovieToGenreRepository } from './repository/movie-to-genre.repository.interface';
import { MovieGenre } from '../movie-genre/entities/movie-genre.entity';
import { MovieToGenre } from './entities/movie-to-genre.entity';

@Injectable()
export class MovieToGenreService {
  constructor(
    @Inject('MovieToGenreRepository')
    private readonly movieToGenreRepository: IMovieToGenreRepository,
  ) {}

  public async removeAllByMovieId(movieId: string): Promise<void> {
    if (!movieId) return;

    const genres = await this.movieToGenreRepository.findAllBy({ movieId });

    if (!genres?.length) return;

    await Promise.all(
      genres?.map((genre) =>
        this.movieToGenreRepository.delete(movieId, genre.getGenreId()),
      ),
    );
  }

  public async associateMovieToGenres(
    movieId: string,
    genres: MovieGenre[],
  ): Promise<MovieToGenre[]> {
    if (!genres?.length) return [];

    await this.removeAllByMovieId(movieId);

    return await Promise.all(
      genres?.map((genre) =>
        this.movieToGenreRepository.create(movieId, genre.getId()),
      ),
    );
  }
}
