import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'movie',
})
export class MovieRepositoryTypeOrm {
  @PrimaryColumn()
  public id: string;

  @Column()
  public title: string;

  @Column()
  public genres: any[];

  @Column()
  public director: string;

  @Column()
  public cast: string[];

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

  @CreateDateColumn()
  public updatedAt: Date;

  @CreateDateColumn()
  public deletedAt?: Date;
}
