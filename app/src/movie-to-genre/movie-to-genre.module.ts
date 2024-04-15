import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieGenreRepositoryTypeOrm } from 'src/movie-genre/repository/movie-genre.repository.type.orm';
import { MovieRepositoryTypeOrm } from 'src/movie/repository/movie.repository.type.orm';
import { UserRepositoryTypeOrm } from 'src/user/repository/user.repository.type.orm';
import { MovieToGenreRepositoryTypeOrm } from './repository/movie-to-genre.repository.type.orm';
import { MovieToGenreRepository } from './repository/movie-to-genre.repository';

const entities = [
  UserRepositoryTypeOrm,
  MovieGenreRepositoryTypeOrm,
  MovieToGenreRepositoryTypeOrm,
  MovieRepositoryTypeOrm,
];

const models = TypeOrmModule.forFeature(entities);

@Module({
  imports: [models],
  providers: [MovieToGenreRepository],
  exports: [MovieToGenreRepository],
})
export class MovieToGenreModule {}
