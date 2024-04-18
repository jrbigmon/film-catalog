import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../database/entities/type.orm.entities';
import { MovieToGenreService } from './movie-to-genre.service';
import { MovieToGenreRepository } from './repository/movie-to-genre.repository';

const models = TypeOrmModule.forFeature(entities);

@Module({
  imports: [models],
  providers: [
    MovieToGenreService,
    MovieToGenreRepository,
    {
      provide: 'MovieToGenreRepository',
      useExisting: MovieToGenreRepository,
    },
  ],
  exports: [MovieToGenreService],
})
export class MovieToGenreModule {}
