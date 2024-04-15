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
    private readonly movieRepository: Repository<MovieRepositoryTypeOrm>,
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
    const movie = await this.movieRepository.findOneBy({ id });

    return this.movieMount(movie);
  }
  async findByFilter(filter: IFindByFilter): Promise<Movie> {
    const movie = await this.movieRepository.findOneBy(filter);
    return this.movieMount(movie);
  }

  async findAll(filters?: IFindAllFilters): Promise<Movie[]> {
    const movies = await this.movieRepository.find(filters.filters);

    if (!movies?.length) return [];

    return movies?.map((movie) => this.movieMount(movie));
  }

  async create(movie: Movie): Promise<Movie> {
    const movieCreated = await this.movieRepository.save({ ...movie });
    return this.movieMount(movieCreated);
  }

  async update(id: string, movie: Movie): Promise<boolean> {
    const movieUpdated = await this.movieRepository.update(id, { ...movie });

    return movieUpdated?.affected > 0;
  }

  async delete(id: string): Promise<void> {
    await this.movieRepository.delete(id);
  }
}
