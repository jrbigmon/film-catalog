import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { MovieGenreRepositoryInMemory } from './entities/movie-genre.repository.in.memory';
import { MovieGenreRepository } from './entities/movie-genre.repository.interface';
import { MovieGenreService } from './movie-genre.service';

describe('MovieGenreService', () => {
  let service: MovieGenreService;
  let repository: MovieGenreRepository;

  beforeEach(async () => {
    repository = new MovieGenreRepositoryInMemory();
    service = new MovieGenreService(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create a new movie genre', async () => {
    const payload: CreateMovieGenreDto = {
      name: 'Action',
    };

    const newMovieGenre = await service.create(payload);

    expect(newMovieGenre).toBeDefined();
  });
});
