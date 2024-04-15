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

  findById(id: string): Promise<Movie> {
    throw new Error('Method not implemented.');
  }
  findByFilter(filter: IFindByFilter): Promise<Movie> {
    throw new Error('Method not implemented.');
  }
  findAll(filters?: IFindAllFilters): Promise<Movie[]> {
    throw new Error('Method not implemented.');
  }
  create(movie: Movie): Promise<Movie> {
    throw new Error('Method not implemented.');
  }
  update(id: string, movie: Movie): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
