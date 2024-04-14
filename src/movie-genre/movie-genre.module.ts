import { Module } from '@nestjs/common';
import { MovieGenreService } from './movie-genre.service';
import { MovieGenreController } from './movie-genre.controller';
import { MovieGenreRepositoryInMemory } from './repository/movie-genre.repository.in.memory';

@Module({
  controllers: [MovieGenreController],
  providers: [
    MovieGenreService,
    {
      provide: 'MovieGenreRepository',
      useValue: new MovieGenreRepositoryInMemory(),
    },
  ],
  exports: [MovieGenreService],
})
export class MovieGenreModule {}
