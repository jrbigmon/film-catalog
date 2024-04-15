import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieToGenreRepository } from './repository/movie-to-genre.repository';
import entities from '../database/entities/type.orm.entities';

const models = TypeOrmModule.forFeature(entities);

@Module({
  imports: [models],
  providers: [MovieToGenreRepository],
  exports: [MovieToGenreRepository],
})
export class MovieToGenreModule {}
