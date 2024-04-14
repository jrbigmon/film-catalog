import { MovieGenre } from '../movie-genre/entities/movie-genre.entity';
import { MovieGenreService } from '../movie-genre/movie-genre.service';
import { IMovieGenreService } from '../movie-genre/movie-genre.service.interface';
import { MovieGenreRepositoryInMemory } from '../movie-genre/repository/movie-genre.repository.in.memory';
import { IMovieGenreRepository } from '../movie-genre/repository/movie-genre.repository.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';
import { MovieRepositoryInMemory } from './repository/movie.repository.in.memory';
import { IMovieRepository } from './repository/movie.repository.interface';

describe('MovieService', () => {
  let service: MovieService;
  let repository: IMovieRepository;

  let movieGenreService: IMovieGenreService;
  let movieGenreRepository: IMovieGenreRepository;

  beforeAll(() => {
    movieGenreRepository = new MovieGenreRepositoryInMemory([
      new MovieGenre('Action', '123', new Date(), new Date()),
      new MovieGenre('Drama', '123', new Date(), new Date()),
      new MovieGenre('Suspense', '123', new Date(), new Date()),
    ]);
    movieGenreService = new MovieGenreService(movieGenreRepository);
  });

  describe('Create', () => {
    beforeEach(() => {
      repository = new MovieRepositoryInMemory();
      service = new MovieService(repository, movieGenreService);
    });

    it('should be create a new movie', async () => {
      const payload: CreateMovieDto = {
        title: 'The best movie ever',
        cast: ['me', 'me2'],
        director: 'me',
        country: 'Greenland',
        durationMinutes: 300,
        genres: ['Action', 'Drama'],
        language: 'Latin',
        rating: 10,
        releaseYear: 2030,
        synopsis: 'The best movie ever myself',
      };

      const movieCreated = await service.create(payload);

      expect(movieCreated).not.toBeNull();
      expect(movieCreated.getId()).not.toBeNull();
      expect(movieCreated.getGenres()).toHaveLength(2);
    });
  });
});
