import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { IMovieRepository } from './repository/movie.repository.interface';
import { IMovieGenreService } from '../movie-genre/movie-genre.service.interface';
import { ExceptionsServices } from '../utils/exceptions/exceptions-services';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    private readonly repository: IMovieRepository,
    private readonly movieGenreService: IMovieGenreService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const { genres, ...rest } = createMovieDto;

    const genresInDB = await this.movieGenreService.findAll({
      filters: { name: genres },
    });

    if (!genresInDB?.length) {
      throw new ExceptionsServices(
        `Movie Genres not found`,
        HttpStatus.BAD_REQUEST,
        'genres',
      );
    }

    const newMovie = Movie.create({
      ...rest,
      genres: genresInDB,
    });

    const movieCreated = await this.repository.create(newMovie);

    return movieCreated;
  }

  findAll() {
    return `This action returns all movie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
