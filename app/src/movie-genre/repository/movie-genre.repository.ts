import { QueryRunner, Repository } from 'typeorm';
import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from '../entities/movie-genre.entity';
import { IMovieGenreRepository } from './movie-genre.repository.interface';
import { MovieGenreRepositoryTypeOrm } from './movie-genre.repository.type.orm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MovieGenreRepository implements IMovieGenreRepository {
  constructor(
    @InjectRepository(MovieGenreRepositoryTypeOrm)
    private readonly movieGenreRepository: Repository<MovieGenreRepositoryTypeOrm>,
  ) {}

  private getRepository(
    queryRunner?: QueryRunner,
  ): Repository<MovieGenreRepositoryTypeOrm> {
    return queryRunner
      ? queryRunner.manager.getRepository(MovieGenreRepositoryTypeOrm)
      : this.movieGenreRepository;
  }

  public static movieGenreMount(
    movieGenre: MovieGenreRepositoryTypeOrm,
  ): MovieGenre {
    const { id, name, createdAt, updatedAt, deletedAt } = movieGenre;

    return new MovieGenre(name, id, createdAt, updatedAt, deletedAt);
  }

  async findById(id: string, queryRunner?: QueryRunner): Promise<MovieGenre> {
    const movieGenre = await this.getRepository(queryRunner).findOneBy({ id });

    return MovieGenreRepository.movieGenreMount(movieGenre);
  }

  async findAll(
    filters?: IFindAllFilters,
    queryRunner?: QueryRunner,
  ): Promise<MovieGenre[]> {
    const movieGenres = await this.getRepository(queryRunner).find(
      filters?.filters,
    );

    if (!movieGenres?.length) return [];

    return movieGenres?.map((movieGenre) =>
      MovieGenreRepository.movieGenreMount(movieGenre),
    );
  }

  async create(
    movieGenre: MovieGenre,
    queryRunner?: QueryRunner,
  ): Promise<MovieGenre> {
    const movieGenreCreated = await this.getRepository(queryRunner).save({
      ...movieGenre,
    });

    return MovieGenreRepository.movieGenreMount(movieGenreCreated);
  }

  async update(
    id: string,
    movieGenre: MovieGenre,
    queryRunner?: QueryRunner,
  ): Promise<boolean> {
    const movieGenreUpdated = await this.getRepository(queryRunner).update(id, {
      ...movieGenre,
    });

    return movieGenreUpdated.affected > 0;
  }

  async delete(id: string, queryRunner?: QueryRunner): Promise<void> {
    await this.getRepository(queryRunner).delete(id);
  }

  async findByName(
    name: string,
    queryRunner?: QueryRunner,
  ): Promise<MovieGenre> {
    if (!name) return null;

    const movieGenre = await this.getRepository(queryRunner).findOne({
      where: { name },
    });

    if (!movieGenre) return null;

    return MovieGenreRepository.movieGenreMount(movieGenre);
  }
}
