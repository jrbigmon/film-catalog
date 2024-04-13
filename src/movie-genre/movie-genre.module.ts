import { Module } from '@nestjs/common';
import { MovieGenreService } from './movie-genre.service';
import { MovieGenreController } from './movie-genre.controller';
import { MovieGenreRepositoryInMemory } from './entities/movie-genre.repository.in.memory';

@Module({
  controllers: [MovieGenreController],
  providers: [
    MovieGenreService,
    {
      provide: 'MovieGenreRepository',
      useValue: new MovieGenreRepositoryInMemory(),
    },
  ],
})
export class MovieGenreModule {}
