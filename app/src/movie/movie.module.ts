import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieGenreService } from '../movie-genre/movie-genre.service';
import { MovieRepository } from './repository/movie.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieGenreModule } from 'src/movie-genre/movie-genre.module';
import { MovieToGenreModule } from 'src/movie-to-genre/movie-to-genre.module';
import entities from '../database/entities/type.orm.entities';

const models = TypeOrmModule.forFeature(entities);

@Module({
  imports: [models, MovieGenreModule, MovieToGenreModule],
  controllers: [MovieController],
  providers: [
    MovieService,
    MovieRepository,
    {
      provide: 'MovieRepository',
      useExisting: MovieRepository,
    },
    {
      provide: 'MovieGenreService',
      useExisting: MovieGenreService,
    },
  ],
})
export class MovieModule {}
