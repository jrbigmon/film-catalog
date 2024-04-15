import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieGenreRepositoryTypeOrm } from 'src/movie-genre/repository/movie-genre.repository.type.orm';
import { MovieRepositoryTypeOrm } from 'src/movie/repository/movie.repository.type.orm';
import { UserRepositoryTypeOrm } from 'src/user/repository/user.repository.type.orm';
import { MovieToGenreTypeOrm } from './repository/movie-to-genre.repository.type.orm';

const entities = [
  UserRepositoryTypeOrm,
  MovieGenreRepositoryTypeOrm,
  MovieToGenreTypeOrm,
  MovieRepositoryTypeOrm,
];

const models = TypeOrmModule.forFeature(entities);

@Module({
  imports: [models],
})
export class MovieToGenreModule {}
