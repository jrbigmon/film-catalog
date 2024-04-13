import { Test, TestingModule } from '@nestjs/testing';
import { MovieGenreController } from './movie-genre.controller';
import { MovieGenreService } from './movie-genre.service';

describe('MovieGenreController', () => {
  let controller: MovieGenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieGenreController],
      providers: [MovieGenreService],
    }).compile();

    controller = module.get<MovieGenreController>(MovieGenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
