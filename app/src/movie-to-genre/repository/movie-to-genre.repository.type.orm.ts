import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'movie_to_genre',
})
export class MovieToGenreRepositoryTypeOrm {
  @PrimaryColumn({ generated: 'uuid' })
  public id: string;

  @Column({ name: 'movie_id', foreignKeyConstraintName: 'movie_id' })
  public movieId: string;

  @Column({ name: 'genre_id' })
  public genreId: string;
}
