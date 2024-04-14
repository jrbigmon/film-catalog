import { MovieGenre } from '../../movie-genre/entities/movie-genre.entity';
import { Movie } from './movie.entity';

describe('Movie', () => {
  describe('Create a new Movie', () => {
    it('should create a new Movie instance', () => {
      const movie = Movie.create({
        title: 'Test 1',
        genres: [new MovieGenre('Action', '123')],
        director: 'Me',
        cast: ['Me', 'Me 2', 'Me 3'],
        releaseYear: 2032,
        durationMinutes: 300,
        rating: 10,
        language: 'Latin',
        country: 'Greenland',
        synopsis: 'The best movie about myself',
      });

      expect(movie).not.toBeNull();
      expect(movie.getId()).not.toBeNull();
    });
  });
});
