import { MovieGenre } from '../movie-genre/entities/movie-genre.entity';
import { MovieGenreService } from '../movie-genre/movie-genre.service';
import { IMovieGenreService } from '../movie-genre/movie-genre.service.interface';
import { MovieGenreRepositoryInMemory } from '../movie-genre/repository/movie-genre.repository.in.memory';
import { IMovieGenreRepository } from '../movie-genre/repository/movie-genre.repository.interface';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
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

    it('should be not create a new movie if the genres not found', async () => {
      const payload: CreateMovieDto = {
        title: 'The best movie ever',
        director: 'me',
        country: 'Greenland',
        durationMinutes: 300,
        genres: ['Any', 'Any2'],
        language: 'Latin',
        rating: 10,
        releaseYear: 2030,
        synopsis: 'The best movie ever myself',
      };

      try {
        await service.create(payload);
      } catch (error) {
        expect(error.message).toBe('Movie Genres not found');
      }
    });
  });

  describe('Update', () => {
    beforeEach(() => {
      repository = new MovieRepositoryInMemory([
        new Movie(
          'The best movie ever',
          [new MovieGenre('Action', '123', new Date(), new Date())],
          'Me',
          2030,
          300,
          10,
          'Latin',
          'Greenland',
          'Best movie ever myself',
          null,
          '123',
        ),
      ]);
      service = new MovieService(repository, movieGenreService);
    });

    it('should be update a movie', async () => {
      const payload: UpdateMovieDto = {
        title: 'The best best movie ever',
      };

      const result = await service.update('123', payload);
      const movieInDB = await service.findOne('123');

      expect(result).toBeTruthy();
      expect(movieInDB.getTitle()).toBe(payload.title);
    });

    it('should be not update a movie when the id does not exist', async () => {
      const payload: UpdateMovieDto = {
        title: 'The best best movie ever',
      };

      try {
        await service.update('321', payload);
      } catch (error) {
        expect(error.message).toBe('Movie not found');
      }
    });
  });

  describe('Remove', () => {
    beforeEach(() => {
      repository = new MovieRepositoryInMemory([
        new Movie(
          'The best movie ever',
          [new MovieGenre('Action', '123', new Date(), new Date())],
          'Me',
          2030,
          300,
          10,
          'Latin',
          'Greenland',
          'Best movie ever myself',
          null,
          '123',
        ),
      ]);
      service = new MovieService(repository, movieGenreService);
    });

    it('should remove a movie and return void', async () => {
      const result = await service.remove('123');
      const searchValueInDb = await repository.findById('123');

      expect(searchValueInDb).toBeUndefined();
      expect(result).toBeUndefined();
    });

    it('should be not delete a movie when the id does not exist', async () => {
      try {
        await service.remove('321');
      } catch (error) {
        expect(error.message).toBe('Movie not found');
      }
    });
  });
});
