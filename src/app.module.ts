import { Module } from '@nestjs/common';
import { MovieGenreModule } from './movie-genre/movie-genre.module';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [MovieGenreModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
