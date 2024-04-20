import { Injectable } from '@nestjs/common';
import { IMovieRepository } from './movie.repository.interface';
import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { IFindByFilter } from '../../utils/interfaces/find-by-filters.interface';
import { Movie } from '../entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, QueryRunner, Repository } from 'typeorm';
import { MovieRepositoryTypeOrm } from './movie.repository.type.orm';
import { MovieGenreRepository } from 'src/movie-genre/repository/movie-genre.repository';
import { opLikeTypeOrm } from '../../utils/functions/op-like-type-orm';
import { orderTypeOrm } from '../../utils/functions/order-type-orm';
import { limitByTypeOrm } from '../../utils/functions/limit-type-orm';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(MovieRepositoryTypeOrm)
    private readonly movieRepository: Repository<MovieRepositoryTypeOrm>,
  ) {}

  private getRepository(
    queryRunner?: QueryRunner,
  ): Repository<MovieRepositoryTypeOrm> {
    return queryRunner
      ? queryRunner.manager.getRepository(MovieRepositoryTypeOrm)
      : this.movieRepository;
  }

  public static movieMount(movie: MovieRepositoryTypeOrm): Movie {
    const {
      id,
      title,
      genres,
      director,
      releaseYear,
      durationMinutes,
      rating,
      language,
      country,
      synopsis,
      posterURL,
      createdAt,
      updatedAt,
      deletedAt,
    } = movie;

    return new Movie(
      title,
      genres?.map((genre) => MovieGenreRepository.movieGenreMount(genre)),
      director,
      releaseYear,
      durationMinutes,
      rating,
      language,
      country,
      synopsis,
      posterURL,
      id,
      createdAt,
      updatedAt,
      deletedAt,
    );
  }

  async findById(id: string, queryRunner?: QueryRunner): Promise<Movie> {
    const movie = await this.getRepository(queryRunner).findOne({
      where: { id },
      relations: {
        genres: true,
      },
    });

    return MovieRepository.movieMount(movie);
  }

  async findByFilter(
    filter: IFindByFilter,
    queryRunner?: QueryRunner,
  ): Promise<Movie> {
    const movie = await this.getRepository(queryRunner).findOneBy(filter);
    return MovieRepository.movieMount(movie);
  }

  async findAll(
    filters?: IFindAllFilters,
    queryRunner?: QueryRunner,
  ): Promise<{ count: number; movies: Movie[] }> {
    const genresKey = filters?.filters?.['genres'];

    const genresFilters = genresKey
      ? { name: In(Array.isArray(genresKey) ? genresKey : [genresKey]) }
      : {};

    const { skip, take } = limitByTypeOrm(filters?.limitBy, filters?.page);

    const [movies, count] = await this.getRepository(queryRunner).findAndCount({
      where: {
        ...opLikeTypeOrm(filters?.filters),
        genres: genresFilters,
      },
      order: orderTypeOrm(filters?.orderBy),
      skip,
      take,
      relations: {
        genres: true,
      },
    });

    return {
      count,
      movies: movies?.map((movie) => MovieRepository.movieMount(movie)),
    };
  }

  async create(movie: Movie, queryRunner?: QueryRunner): Promise<Movie> {
    const movieCreated = await this.getRepository(queryRunner).save({
      ...movie,
    });

    return MovieRepository.movieMount(movieCreated);
  }

  async update(
    id: string,
    movie: Movie,
    queryRunner?: QueryRunner,
  ): Promise<boolean> {
    const { genres, ...movieToUpdate } = movie.toJSON();
    const movieUpdated = await this.getRepository(queryRunner).update(id, {
      ...movieToUpdate,
    });

    return movieUpdated?.affected > 0;
  }

  async delete(id: string, queryRunner?: QueryRunner): Promise<void> {
    await this.getRepository(queryRunner).softDelete(id);
  }
}
