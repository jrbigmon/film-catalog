import { MovieGenre } from '../../movie-genre/entities/movie-genre.entity';

export class IMovie {
  id?: string;
  title: string;
  genres: MovieGenre[];
  director: string;
  cast: string[];
  releaseYear: number;
  durationMinutes: number;
  rating: number;
  synopsis: string;
  language: string;
  country: string;
  posterURL?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
