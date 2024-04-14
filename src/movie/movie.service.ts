import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { IMovieRepository } from './repository/movie.repository.interface';
import { IMovieGenreService } from '../movie-genre/movie-genre.service.interface';
import { ExceptionsServices } from '../utils/exceptions/exceptions-services';
import { Movie } from './entities/movie.entity';
import { IFindAllFilters } from '../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from '../movie-genre/entities/movie-genre.entity';

@Injectable()
export class MovieService {
  constructor(
    @Inject('MovieRepository')
    private readonly repository: IMovieRepository,
    @Inject('MovieGenreService')
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

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movieInDb = await this.repository.findById(id);

    if (!movieInDb) {
      throw new ExceptionsServices(
        `Movie not found`,
        HttpStatus.BAD_REQUEST,
        'id',
      );
    }

    const { genres, ...rest } = updateMovieDto;

    let genresInDB: MovieGenre[] = [];

    if (genres) {
      genresInDB = await this.movieGenreService.findAll({
        filters: { name: genres },
      });

      if (!genresInDB) {
        throw new ExceptionsServices(
          `Movie Genres not found`,
          HttpStatus.BAD_REQUEST,
          'genres',
        );
      }
    }

    movieInDb.update({ genres: genresInDB, ...rest });

    const result = await this.repository.update(id, movieInDb);

    return result;
  }

  async remove(id: number) {
    return `This action removes a #${id} movie`;
  }

  async findOne(id: string) {
    return await this.repository.findById(id);
  }

  async findAll(filters?: IFindAllFilters) {
    return await this.repository.findAll(filters);
  }
}
