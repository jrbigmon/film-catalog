import { Module } from '@nestjs/common';
import { MovieGenreService } from './movie-genre.service';
import { MovieGenreController } from './movie-genre.controller';
import { MovieGenreRepository } from './repository/movie-genre.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../database/entities/type.orm.entities';

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
