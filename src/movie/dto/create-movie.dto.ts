export class CreateMovieDto {
  title: string;
  genres: string[];
  director: string;
  cast: string[];
  releaseYear: number;
  durationMinutes: number;
  rating: number;
  synopsis: string;
  language: string;
  country: string;
  posterURL?: string;
}
