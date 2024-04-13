import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { MovieGenre } from './entities/movie-genre.entity';
import { MovieGenreRepositoryInMemory } from './entities/movie-genre.repository.in.memory';
import { IMovieGenreRepository } from './entities/movie-genre.repository.interface';
import { MovieGenreService } from './movie-genre.service';

describe('MovieGenreService', () => {
  let service: MovieGenreService;
  let repository: IMovieGenreRepository;

  describe('Create', () => {
    beforeEach(async () => {
      repository = new MovieGenreRepositoryInMemory();
      service = new MovieGenreService(repository);
    });

    it('should be create a new movie genre', async () => {
      const payload: CreateMovieGenreDto = {
        name: 'Action',
      };

      const newMovieGenre = await service.create(payload);

      expect(newMovieGenre).toBeDefined();
    });
  });

  describe('Update', () => {
    beforeEach(async () => {
      repository = new MovieGenreRepositoryInMemory([
        new MovieGenre('Action', '123', new Date(), new Date(), null),
      ]);

      service = new MovieGenreService(repository);
    });

    it('should be update a movie genre and return true', async () => {
      const payload: UpdateMovieGenreDto = {
        name: 'Super Action',
      };

      const updated = await service.update('123', payload);

      expect(updated).toBeTruthy();
    });

    it('should be not update a movie genre when the id does not exist', async () => {
      const payload: UpdateMovieGenreDto = {
        name: 'Super Action',
      };

      try {
        await service.update('321', payload);
      } catch (error) {
        expect(error.message).toBe('Movie Genre not found');
      }
    });
  });
});
