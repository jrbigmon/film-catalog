import { QueryRunner } from 'typeorm';
import { IFindAllFilters } from '../../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from '../entities/movie-genre.entity';

export interface IMovieGenreRepository {
  findById(id: string, queryRunner?: QueryRunner): Promise<MovieGenre>;
  findAll(
    filters?: IFindAllFilters,
    queryRunner?: QueryRunner,
  ): Promise<MovieGenre[]>;
  create(
    movieGenre: MovieGenre,
    queryRunner?: QueryRunner,
  ): Promise<MovieGenre>;
  update(
    id: string,
    movieGenre: MovieGenre,
    queryRunner?: QueryRunner,
  ): Promise<boolean>;
  delete(id: string, queryRunner?: QueryRunner): Promise<void>;
  findByName(name: string, queryRunner?: QueryRunner): Promise<MovieGenre>;
}
