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

  @ManyToMany(() => MovieGenreRepositoryTypeOrm, (genre) => genre.movies)
  @JoinTable({
    name: 'movie_to_genre',
    joinColumn: {
      name: 'movieId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genreId',
      referencedColumnName: 'id',
    },
  })
  public genres: MovieGenreRepositoryTypeOrm[];

  @Column()
  public director: string;

  @Column()
  public releaseYear: number;

  @Column()
  public durationMinutes: number;

  @Column()
  public rating: number;

  @Column()
  public language: string;

  @Column()
  public country: string;

  @Column()
  public synopsis?: string;

  @Column()
  public posterURL?: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt?: Date;
}
