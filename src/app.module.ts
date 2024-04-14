import { Module } from '@nestjs/common';
import { MovieGenreModule } from './movie-genre/movie-genre.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MovieGenreModule, MovieModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
