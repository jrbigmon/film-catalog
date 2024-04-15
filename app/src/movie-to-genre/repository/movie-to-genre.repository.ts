import { InjectRepository } from '@nestjs/typeorm';
import { Entity, Repository } from 'typeorm';
import { MovieToGenreRepositoryTypeOrm } from './movie-to-genre.repository.type.orm';

@Entity({
  name: 'movie_to_genre',
})
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
}
