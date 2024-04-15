import { MovieGenre } from './movie-genre.entity';

describe('MovieGenre', () => {
  describe('Create a new MovieGenre', () => {
    it('should create a new MovieGenre instance', () => {
      const movieGenre = MovieGenre.create({ name: 'Action' });

      expect(movieGenre).not.toBeNull();
      expect(movieGenre.getId()).not.toBeNull();
      expect(movieGenre.getName()).toBe('Action');
    });
  });
});
