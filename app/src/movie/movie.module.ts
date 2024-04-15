import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieGenreService } from '../movie-genre/movie-genre.service';
import { MovieRepository } from './repository/movie.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieGenreRepositoryTypeOrm } from 'src/movie-genre/repository/movie-genre.repository.type.orm';
import { MovieToGenreRepositoryTypeOrm } from 'src/movie-to-genre/repository/movie-to-genre.repository.type.orm';
import { UserRepositoryTypeOrm } from 'src/user/repository/user.repository.type.orm';
import { MovieRepositoryTypeOrm } from './repository/movie.repository.type.orm';
import { MovieGenreModule } from 'src/movie-genre/movie-genre.module';
import { MovieToGenreModule } from 'src/movie-to-genre/movie-to-genre.module';

const entities = [
  UserRepositoryTypeOrm,
  MovieGenreRepositoryTypeOrm,
  MovieToGenreRepositoryTypeOrm,
  MovieRepositoryTypeOrm,
];

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
