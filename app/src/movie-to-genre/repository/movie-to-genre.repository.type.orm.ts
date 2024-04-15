import { MovieGenreRepositoryTypeOrm } from 'src/movie-genre/repository/movie-genre.repository.type.orm';
import { MovieRepositoryTypeOrm } from 'src/movie/repository/movie.repository.type.orm';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'movie-to-genre',
})
export class MovieToGenreRepositoryTypeOrm {
  @PrimaryColumn()
  public id: string;

  @Column()
  public movieId: string;

  @Column()
  public genreId: string;

  @ManyToOne(() => MovieRepositoryTypeOrm, (movie) => movie.genres)
  public movie: MovieRepositoryTypeOrm;

  @ManyToOne(() => MovieGenreRepositoryTypeOrm, (genre) => genre.movieToGenre)
  public genre: MovieGenreRepositoryTypeOrm;
}
