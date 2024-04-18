import { MovieGenreRepositoryTypeOrm } from 'src/movie-genre/repository/movie-genre.repository.type.orm';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'movie',
})
export class MovieRepositoryTypeOrm {
  @PrimaryColumn()
  public id: string;

  @Column()
  public title: string;

  @ManyToMany(() => MovieGenreRepositoryTypeOrm)
  @JoinTable({
    name: 'movie_to_genre',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  public genres: MovieGenreRepositoryTypeOrm[];

  @Column()
  public director: string;

  @Column({ name: 'release_year' })
  public releaseYear: number;

  @Column({ name: 'duration_minutes' })
  public durationMinutes: number;

  @Column()
  public rating: number;

  @Column()
  public language: string;

  @Column()
  public country: string;

  @Column()
  public synopsis?: string;

  @Column({ name: 'poster_url' })
  public posterURL?: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', default: null })
  public deletedAt: Date;
}
