import { Injectable } from '@nestjs/common';
import { IMovieRepository } from './movie.repository.interface';
import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { IFindByFilter } from '../../utils/interfaces/find-by-filters.interface';
import { Movie } from '../entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieRepositoryTypeOrm } from './movie.repository.type.orm';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @InjectRepository(MovieRepositoryTypeOrm)
    private readonly movieRepositoryTypeOrm: Repository<MovieRepositoryTypeOrm>,
  ) {}

  private movieMount(movie: MovieRepositoryTypeOrm): Movie {
    const {
      id,
      title,
      genres,
      director,
      cast,
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
      genres,
      director,
      cast,
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

  async findById(id: string): Promise<Movie> {
    const movie = await this.movieRepositoryTypeOrm.findOneBy({ id });

    return this.movieMount(movie);
  }
  async findByFilter(filter: IFindByFilter): Promise<Movie> {
    const movie = await this.movieRepositoryTypeOrm.findOneBy(filter);
    return this.movieMount(movie);
  }

  async findAll(filters?: IFindAllFilters): Promise<Movie[]> {
    const movies = await this.movieRepositoryTypeOrm.find(filters.filters);

    if (!movies?.length) return [];

    return movies?.map((movie) => this.movieMount(movie));
  }

  async create(movie: Movie): Promise<Movie> {
    const movieCreated = await this.movieRepositoryTypeOrm.save({ ...movie });
  }

  update(id: string, movie: Movie): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
