import { Injectable } from '@nestjs/common';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';

@Injectable()
export class MovieGenreService {
  create(createMovieGenreDto: CreateMovieGenreDto) {
    return 'This action adds a new movieGenre';
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
