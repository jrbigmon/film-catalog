import { QueryRunner } from 'typeorm';
import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { IFindByFilter } from '../../utils/interfaces/find-by-filters.interface';
import { Movie } from '../entities/movie.entity';

export interface IMovieRepository {
  findById(id: string, queryRunner?: QueryRunner): Promise<Movie>;
  findByFilter(
    filter: IFindByFilter,
    queryRunner?: QueryRunner,
  ): Promise<Movie>;
  findAll(
    filters?: IFindAllFilters,
    queryRunner?: QueryRunner,
  ): Promise<{ count: number; movies: Movie[] }>;
  create(movie: Movie, queryRunner?: QueryRunner): Promise<Movie>;
  update(id: string, movie: Movie, queryRunner?: QueryRunner): Promise<boolean>;
  delete(id: string, queryRunner?: QueryRunner): Promise<void>;
}
