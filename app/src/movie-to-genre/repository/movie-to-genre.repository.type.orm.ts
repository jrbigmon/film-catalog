import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { MovieRepositoryTypeOrm } from '../../movie/repository/movie.repository.type.orm';
import { MovieGenreRepositoryTypeOrm } from '../../movie-genre/repository/movie-genre.repository.type.orm';

@Entity({
  name: 'movie_to_genre',
})
export class MovieToGenreRepositoryTypeOrm {
  @Column({ name: 'movie_id', primary: true })
  public movieId: string;

  @Column({ name: 'genre_id', primary: true })
  public genreId: string;

  @ManyToOne(() => MovieRepositoryTypeOrm, (movie) => movie.genres)
  @JoinColumn([{ name: 'movie_id', referencedColumnName: 'id' }])
  public movies: MovieRepositoryTypeOrm[];

  @ManyToOne(() => MovieGenreRepositoryTypeOrm, (genre) => genre.movies)
  @JoinColumn([{ name: 'genre_id', referencedColumnName: 'id' }])
  public genres: MovieGenreRepositoryTypeOrm[];
}
