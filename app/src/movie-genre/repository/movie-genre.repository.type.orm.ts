import { MovieRepositoryTypeOrm } from 'src/movie/repository/movie.repository.type.orm';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'movie_genre',
})
export class MovieGenreRepositoryTypeOrm {
  @PrimaryColumn()
  public id: string;

  @Column()
  public name: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', default: null })
  public deletedAt: Date;

  @ManyToMany(() => MovieRepositoryTypeOrm, (movie) => movie.genres)
  public movies: MovieRepositoryTypeOrm[];
}
