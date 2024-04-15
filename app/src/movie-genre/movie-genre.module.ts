import { Module } from '@nestjs/common';
import { MovieGenreService } from './movie-genre.service';
import { MovieGenreController } from './movie-genre.controller';
import { MovieGenreRepository } from './repository/movie-genre.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieGenreRepositoryTypeOrm } from './repository/movie-genre.repository.type.orm';

const models = TypeOrmModule.forFeature([MovieGenreRepositoryTypeOrm]);

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
