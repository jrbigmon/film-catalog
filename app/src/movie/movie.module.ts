import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieGenreService } from '../movie-genre/movie-genre.service';
import { MovieRepository } from './repository/movie.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieGenreModule } from 'src/movie-genre/movie-genre.module';
import { MovieToGenreModule } from 'src/movie-to-genre/movie-to-genre.module';
import entities from '../database/entities/type.orm.entities';
import { MovieToGenreService } from '../movie-to-genre/movie-to-genre.service';
import { CacheManagerModule } from '../cache-manager/cache-manager.module';
import { CacheManagerService } from '../cache-manager/cache-manager.service';

const models = TypeOrmModule.forFeature(entities);

@Module({
  imports: [models, MovieGenreModule, MovieToGenreModule, CacheManagerModule],
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
    {
      provide: 'MovieToGenreService',
      useExisting: MovieToGenreService,
    },
    {
      provide: 'CacheManagerService',
      useExisting: CacheManagerService,
    },
  ],
})
export class MovieModule {}
