import { Injectable } from '@nestjs/common';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { MovieGenre } from './entities/movie-genre.entity';
import { MovieGenreRepository } from './entities/movie-genre.repository.interface';

@Injectable()
export class MovieGenreService {
  constructor(private readonly repository: MovieGenreRepository) {}

  async create(createMovieGenreDto: CreateMovieGenreDto): Promise<MovieGenre> {
    const movieGenre = MovieGenre.create({ name: createMovieGenreDto.name });

    const movieGenreCreated = await this.repository.create(movieGenre);

    return movieGenreCreated;
  }

  findAll() {
    return `This action returns all movieGenre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieGenre`;
  }

  update(id: number, updateMovieGenreDto: UpdateMovieGenreDto) {
    return `This action updates a #${id} movieGenre`;
  }

  remove(id: number) {
    return `This action removes a #${id} movieGenre`;
  }
}
