import { Repository } from 'typeorm';
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

  public static movieGenreMount(
    movieGenre: MovieGenreRepositoryTypeOrm,
  ): MovieGenre {
    const { id, name, createdAt, updatedAt, deletedAt } = movieGenre;

    return new MovieGenre(name, id, createdAt, updatedAt, deletedAt);
  }

  async findById(id: string): Promise<MovieGenre> {
    const movieGenre = await this.movieGenreRepository.findOneBy({ id });

    return MovieGenreRepository.movieGenreMount(movieGenre);
  }

  async findAll(filters?: IFindAllFilters): Promise<MovieGenre[]> {
    const movieGenres = await this.movieGenreRepository.find(filters.filters);

    if (!movieGenres?.length) return [];

    return movieGenres?.map((movieGenre) =>
      MovieGenreRepository.movieGenreMount(movieGenre),
    );
  }

  async create(movieGenre: MovieGenre): Promise<MovieGenre> {
    const movieGenreCreated = await this.movieGenreRepository.save({
      ...movieGenre,
    });

    return MovieGenreRepository.movieGenreMount(movieGenreCreated);
  }

  async update(id: string, movieGenre: MovieGenre): Promise<boolean> {
    const movieGenreUpdated = await this.movieGenreRepository.update(id, {
      ...movieGenre,
    });

    return movieGenreUpdated.affected > 0;
  }

  async delete(id: string): Promise<void> {
    await this.movieGenreRepository.delete(id);
  }
}
