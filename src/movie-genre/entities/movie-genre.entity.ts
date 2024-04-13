import { randomUUID } from 'crypto';
import { IMovieGenre } from './movie-genre.interface';

export class MovieGenre {
  private id: string;
  private name: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private deletedAt?: Date;

  constructor(
    name: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    this.id = id ?? randomUUID();
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public static create({ name }: IMovieGenre): MovieGenre {
    const newMovieGenre = new MovieGenre(name);

    return newMovieGenre;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getDeletedAt(): Date {
    return this.deletedAt;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public toJSON(): IMovieGenre {
    return {
      id: this.getId(),
      name: this.getName(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      deletedAt: this.getDeletedAt(),
    };
  }
}
