import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { IMovieRepository } from './repository/movie.repository.interface';
import { IMovieGenreService } from '../movie-genre/movie-genre.service.interface';
import { ExceptionsServices } from '../utils/exceptions/exceptions-services';
import { Movie } from './entities/movie.entity';
import { IFindAllFilters } from '../utils/interfaces/find-all-filters.interface';
import { MovieGenre } from '../movie-genre/entities/movie-genre.entity';
import { IMovieToGenreService } from '../movie-to-genre/movie-to-genre.service.interface';
import { QueryRunner } from 'typeorm';
import { ICacheManagerService } from '../cache-manager/cache-manager.interface';

@Injectable()
export class MovieService {
  constructor(
    @Inject('MovieRepository')
    private readonly repository: IMovieRepository,
    @Inject('MovieGenreService')
    private readonly movieGenreService: IMovieGenreService,
    @Inject('MovieToGenreService')
    private readonly movieToGenreService: IMovieToGenreService,
    @Inject('CacheManagerService')
    private readonly cacheManagerService: ICacheManagerService,
  ) {}

  async create(createMovieDto: CreateMovieDto, queryRunner?: QueryRunner) {
    const { genres, ...rest } = createMovieDto;

    const genresCreated = await this.movieGenreService.getOrCreate(
      genres,
      queryRunner,
    );

    if (!genresCreated?.length) {
      throw new ExceptionsServices(
        `Movie Genres not found`,
        HttpStatus.BAD_REQUEST,
        'genres',
      );
    }

    const newMovie = Movie.create({
      ...rest,
      genres: genresCreated,
    });

    const movieCreated = await this.repository.create(newMovie, queryRunner);

    if (movieCreated) {
      await this.movieToGenreService.associateMovieToGenres(
        movieCreated.getId(),
        newMovie.getGenres(),
        queryRunner,
      );
    }

    return movieCreated;
  }

  async update(
    id: string,
    updateMovieDto: UpdateMovieDto,
    queryRunner?: QueryRunner,
  ) {
    const movieInDb = await this.repository.findById(id, queryRunner);

    if (!movieInDb) {
      throw new ExceptionsServices(
        `Movie not found`,
        HttpStatus.BAD_REQUEST,
        'id',
      );
    }

    const { genres, ...rest } = updateMovieDto;

    let genresCreated: MovieGenre[] = [];

    if (genres) {
      genresCreated = await this.movieGenreService.getOrCreate(
        genres,
        queryRunner,
      );

      if (genresCreated) {
        await this.movieToGenreService.associateMovieToGenres(
          id,
          genresCreated,
          queryRunner,
        );
      }
    }

    movieInDb.update({ genres: genresCreated, ...rest });

    const result = await this.repository.update(id, movieInDb, queryRunner);

    return result;
  }

  async remove(id: string, queryRunner?: QueryRunner) {
    const movieInDB = await this.repository.findById(id, queryRunner);

    if (!movieInDB) {
      throw new ExceptionsServices(
        `Movie not found`,
        HttpStatus.BAD_REQUEST,
        'id',
      );
    }

    movieInDB.delete();

    return await this.repository.delete(id, queryRunner);
  }

  async findAll(filters?: IFindAllFilters, queryRunner?: QueryRunner) {
    return await this.repository.findAll(filters, queryRunner);
  }

  async findOne(id: string, queryRunner?: QueryRunner) {
    const movie = await this.repository.findById(id, queryRunner);

    if (!movie) {
      throw new ExceptionsServices(
        `Movie not found`,
        HttpStatus.BAD_REQUEST,
        'id',
      );
    }

    return movie;
  }
}
