import { Module } from '@nestjs/common';
import { MovieGenreService } from './movie-genre.service';
import { MovieGenreController } from './movie-genre.controller';
import { MovieGenreRepository } from './repository/movie-genre.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieToGenreTypeOrm } from 'src/movie-to-genre/repository/movie-to-genre.repository.type.orm';
import { MovieRepositoryTypeOrm } from 'src/movie/repository/movie.repository.type.orm';
import { UserRepositoryTypeOrm } from 'src/user/repository/user.repository.type.orm';
import { MovieGenreRepositoryTypeOrm } from './repository/movie-genre.repository.type.orm';

const entities = [
  UserRepositoryTypeOrm,
  MovieGenreRepositoryTypeOrm,
  MovieToGenreTypeOrm,
  MovieRepositoryTypeOrm,
];

const models = TypeOrmModule.forFeature(entities);

@Module({
  imports: [models],
  controllers: [MovieGenreController],
  providers: [
    MovieGenreService,
    MovieGenreRepository,
    {
      provide: 'MovieGenreRepository',
      useExisting: MovieGenreRepository,
    },
  ],
  exports: [MovieGenreService],
})
export class MovieGenreModule {}
