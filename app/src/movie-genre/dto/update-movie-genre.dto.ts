import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieGenreDto } from './create-movie-genre.dto';

export class UpdateMovieGenreDto extends PartialType(CreateMovieGenreDto) {}
