import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { MovieGenreService } from '../movie-genre/movie-genre.service';
import { MovieRepositoryInMemory } from './repository/movie.repository.in.memory';
import { MovieGenreModule } from '../movie-genre/movie-genre.module';

@Module({
  imports: [MovieGenreModule],
  controllers: [MovieController],
  providers: [
    MovieService,
    {
      provide: 'MovieRepository',
      useValue: new MovieRepositoryInMemory(),
    },
    {
      provide: 'MovieGenreService',
      useExisting: MovieGenreService,
    },
  ],
})
export class MovieModule {}
