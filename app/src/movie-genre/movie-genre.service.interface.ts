import { IFindAllFilters } from '../utils/interfaces/find-all-filters.interface';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { MovieGenre } from './entities/movie-genre.entity';

export interface IMovieGenreService {
  create(createMovieGenreDto: CreateMovieGenreDto): Promise<MovieGenre>;
  update(
    id: string,
    updateMovieGenreDto: UpdateMovieGenreDto,
  ): Promise<boolean>;
  remove(id: string): Promise<void>;
  findAll(findAllFilters?: IFindAllFilters): Promise<MovieGenre[]>;
  findOne(id: string): Promise<MovieGenre>;
}
