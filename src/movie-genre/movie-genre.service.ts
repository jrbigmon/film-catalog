import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { MovieGenre } from './entities/movie-genre.entity';
import { IMovieGenreRepository } from './repository/movie-genre.repository.interface';
import { IFindAllFilters } from '../utils/interfaces/find-all-filters.interface';
import { ExceptionsServices } from '../utils/exceptions/exceptions-services';
import { IMovieGenreService } from './movie-genre.service.interface';
import { IMovieGenre } from './entities/movie-genre.interface';

@Injectable()
export class MovieGenreService implements IMovieGenreService {
  constructor(
    @Inject('MovieGenreRepository')
    private readonly repository: IMovieGenreRepository,
  ) {}

  async create(createMovieGenreDto: CreateMovieGenreDto): Promise<MovieGenre> {
    const movieGenre = MovieGenre.create({ name: createMovieGenreDto.name });

    const movieGenreCreated = await this.repository.create(movieGenre);

    return movieGenreCreated;
  }

  async update(
    id: string,
    updateMovieGenreDto: UpdateMovieGenreDto,
  ): Promise<boolean> {
    const movieGenreInDatabase = await this.repository.findById(id);

    if (!movieGenreInDatabase) {
      throw new ExceptionsServices(
        `Movie Genre not found`,
        HttpStatus.BAD_REQUEST,
        'id',
      );
    }

    movieGenreInDatabase.update({ name: updateMovieGenreDto?.name });

    const movieGenreUpdated = await this.repository.update(
      id,
      movieGenreInDatabase,
    );

    return movieGenreUpdated;
  }

  async remove(id: string): Promise<void> {
    const movieGenreInDatabase = await this.repository.findById(id);

    if (!movieGenreInDatabase) {
      throw new ExceptionsServices(
        `Movie Genre not found`,
        HttpStatus.BAD_REQUEST,
        'id',
      );
    }

    movieGenreInDatabase.delete();

    await this.repository.delete(id);
  }

  async findAll(findAllFilters?: IFindAllFilters<IMovieGenre>) {
    return await this.repository.findAll(findAllFilters);
  }

  async findOne(id: string) {
    const movieGenre = await this.repository.findById(id);

    if (!movieGenre) {
      throw new ExceptionsServices(
        `Movie Genre not found`,
        HttpStatus.BAD_REQUEST,
        'id',
      );
    }

    return movieGenre;
  }
}
