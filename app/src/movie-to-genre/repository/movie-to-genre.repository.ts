import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
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

  private getRepository(
    queryRunner: QueryRunner,
  ): Repository<MovieToGenreRepositoryTypeOrm> {
    return queryRunner
      ? queryRunner.manager.getRepository(MovieToGenreRepositoryTypeOrm)
      : this.movieToGenreRepository;
  }

  public async create(
    movieId: string,
    genreId: string,
    queryRunner?: QueryRunner,
  ): Promise<MovieToGenre> {
    const movieToGenreInDB = await this.getRepository(queryRunner).findOneBy({
      movieId,
      genreId,
    });

    if (movieToGenreInDB) {
      return new MovieToGenre(
        movieToGenreInDB.movieId,
        movieToGenreInDB.genreId,
      );
    }

    const movieToGenreCreated = await this.getRepository(queryRunner).save({
      movieId,
      genreId,
    });

    return new MovieToGenre(
      movieToGenreCreated.movieId,
      movieToGenreCreated.genreId,
    );
  }

  public async delete(
    movieId: string,
    genreId: string,
    queryRunner?: QueryRunner,
  ): Promise<void> {
    const movieToGenreInDB = await this.getRepository(queryRunner).findOneBy({
      movieId,
      genreId,
    });

    if (movieToGenreInDB) {
      await this.getRepository(queryRunner).delete(movieToGenreInDB);
    }
  }

  public async findAllBy(
    filter: {
      movieId?: string;
      genreId?: string;
    },
    queryRunner?: QueryRunner,
  ): Promise<MovieToGenre[]> {
    if (!filter) return;

    const moviesToGenres = await this.getRepository(queryRunner).find({
      where: { ...filter },
    });

    return moviesToGenres?.map(
      (movieToGenre) =>
        new MovieToGenre(movieToGenre.movieId, movieToGenre.genreId),
    );
  }
}
