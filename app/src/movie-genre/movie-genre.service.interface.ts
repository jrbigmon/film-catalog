import { QueryRunner } from 'typeorm';
import { IFindAllFilters } from '../utils/interfaces/find-all-filters.interface';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { MovieGenre } from './entities/movie-genre.entity';

export interface IMovieGenreService {
  create(
    createMovieGenreDto: CreateMovieGenreDto,
    queryRunner?: QueryRunner,
  ): Promise<MovieGenre>;
  update(
    id: string,
    updateMovieGenreDto: UpdateMovieGenreDto,
    queryRunner?: QueryRunner,
  ): Promise<boolean>;
  remove(id: string, queryRunner?: QueryRunner): Promise<void>;
  findAll(
    findAllFilters?: IFindAllFilters,
    queryRunner?: QueryRunner,
  ): Promise<MovieGenre[]>;
  findOne(id: string, queryRunner?: QueryRunner): Promise<MovieGenre>;
  getOrCreate(
    genres: string[],
    queryRunner?: QueryRunner,
  ): Promise<MovieGenre[]>;
}
