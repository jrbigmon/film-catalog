import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { MovieGenre } from './entities/movie-genre.entity';
import { IMovieGenreRepository } from './repository/movie-genre.repository.interface';
import { IFindAllFilters } from '../utils/interfaces/find-all-filters.interface';
import { ExceptionsServices } from '../utils/exceptions/exceptions-services';
import { IMovieGenreService } from './movie-genre.service.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class MovieGenreService implements IMovieGenreService {
  constructor(
    @Inject('MovieGenreRepository')
    private readonly repository: IMovieGenreRepository,
  ) {}

  async create(
    createMovieGenreDto: CreateMovieGenreDto,
    queryRunner?: QueryRunner,
  ): Promise<MovieGenre> {
    const movieGenre = MovieGenre.create({ name: createMovieGenreDto.name });

    const movieGenreCreated = await this.repository.create(
      movieGenre,
      queryRunner,
    );

    return movieGenreCreated;
  }

  async update(
    id: string,
    updateMovieGenreDto: UpdateMovieGenreDto,
    queryRunner?: QueryRunner,
  ): Promise<boolean> {
    const movieGenreInDatabase = await this.repository.findById(
      id,
      queryRunner,
    );

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
      queryRunner,
    );

    return movieGenreUpdated;
  }

  async remove(id: string, queryRunner?: QueryRunner): Promise<void> {
    const movieGenreInDatabase = await this.repository.findById(
      id,
      queryRunner,
    );

    if (!movieGenreInDatabase) {
      throw new ExceptionsServices(
        `Movie Genre not found`,
        HttpStatus.BAD_REQUEST,
        'id',
      );
    }

    movieGenreInDatabase.delete();

    await this.repository.delete(id, queryRunner);
  }

  async findAll(findAllFilters?: IFindAllFilters, queryRunner?: QueryRunner) {
    return await this.repository.findAll(findAllFilters, queryRunner);
  }

  async findOne(id: string, queryRunner?: QueryRunner) {
    const movieGenre = await this.repository.findById(id, queryRunner);

    if (!movieGenre) {
      throw new ExceptionsServices(
        `Movie Genre not found`,
        HttpStatus.BAD_REQUEST,
        'id',
      );
    }

    return movieGenre;
  }

  public async getOrCreate(
    genres: string[],
    queryRunner?: QueryRunner,
  ): Promise<MovieGenre[]> {
    if (!genres || !genres.length) return [];

    return await Promise.all(
      genres?.map(async (genre) => {
        const genreInDB = await this.repository.findByName(genre, queryRunner);

        if (genreInDB) return genreInDB;

        return await this.create(
          {
            name: genre,
          },
          queryRunner,
        );
      }),
    );
  }
}
