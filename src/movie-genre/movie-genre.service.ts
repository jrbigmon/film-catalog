import { Injectable } from '@nestjs/common';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { MovieGenre } from './entities/movie-genre.entity';
import { IMovieGenreRepository } from './entities/movie-genre.repository.interface';

@Injectable()
export class MovieGenreService {
  constructor(private readonly repository: IMovieGenreRepository) {}

  async create(createMovieGenreDto: CreateMovieGenreDto): Promise<MovieGenre> {
    const movieGenre = MovieGenre.create({ name: createMovieGenreDto.name });

    const movieGenreCreated = await this.repository.create(movieGenre);

    return movieGenreCreated;
  }

  async update(id: string, updateMovieGenreDto: UpdateMovieGenreDto) {
    const movieGenreInDatabase = await this.repository.findById(id);

    if (!movieGenreInDatabase) {
      throw new Error(`Movie Genre not found`);
    }

    movieGenreInDatabase.update({ name: updateMovieGenreDto?.name });

    const movieGenreUpdated = await this.repository.update(
      id,
      movieGenreInDatabase,
    );

    return movieGenreUpdated;
  }

  remove(id: number) {
    return `This action removes a #${id} movieGenre`;
  }

  findAll() {
    return `This action returns all movieGenre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movieGenre`;
  }
}
