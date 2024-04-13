import { Test, TestingModule } from '@nestjs/testing';
import { MovieGenreService } from './movie-genre.service';

describe('MovieGenreService', () => {
  let service: MovieGenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieGenreService],
    }).compile();

    service = module.get<MovieGenreService>(MovieGenreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
