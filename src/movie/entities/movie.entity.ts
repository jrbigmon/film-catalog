import { randomUUID } from 'crypto';
import { MovieGenre } from '../../movie-genre/entities/movie-genre.entity';
import { IMovie } from './movie.interface';

export class Movie {
  private id: string;
  private title: string;
  private genres: MovieGenre[];
  private director: string;
  private cast: string[];
  private releaseYear: number;
  private durationMinutes: number;
  private rating: number;
  private language: string;
  private country: string;
  private synopsis?: string;
  private posterURL?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private deletedAt?: Date;

  constructor(
    title: string,
    genres: MovieGenre[],
    director: string,
    cast: string[],
    releaseYear: number,
    durationMinutes: number,
    rating: number,
    language: string,
    country: string,
    synopsis?: string,
    posterURL?: string,
    id?: string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
  ) {
    this.title = title;
    this.genres = genres;
    this.director = director;
    this.cast = cast;
    this.releaseYear = releaseYear;
    this.durationMinutes = durationMinutes;
    this.rating = rating;
    this.language = language;
    this.country = country;
    this.synopsis = synopsis;
    this.posterURL = posterURL;
    this.id = id ?? randomUUID();
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public static create({
    title,
    genres,
    director,
    cast,
    releaseYear,
    durationMinutes,
    rating,
    language,
    country,
    synopsis,
    posterURL,
  }: IMovie): Movie {
    const newMovie = new Movie(
      title,
      genres,
      director,
      cast,
      releaseYear,
      durationMinutes,
      rating,
      language,
      country,
      synopsis,
      posterURL,
    );

    return newMovie;
  }

  public update({
    title,
    cast,
    country,
    director,
    durationMinutes,
    genres,
    language,
    posterURL,
    rating,
    releaseYear,
    synopsis,
  }: Partial<IMovie>): void {
    title && this.setTitle(title);
    cast && this.setCast(cast);
    country && this.setCountry(country);
    director && this.setDirector(director);
    durationMinutes && this.setDurationMinutes(durationMinutes);
    genres?.length && this.setGenres(genres);
    language && this.setLanguage(language);
    posterURL && this.setPosterURL(posterURL);
    rating && this.setRating(rating);
    releaseYear && this.setReleaseYear(releaseYear);
    synopsis && this.setSynopsis(synopsis);
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getGenres(): MovieGenre[] {
    return this.genres;
  }

  public getDirector(): string {
    return this.director;
  }

  public getCast(): string[] {
    return this.cast;
  }

  public getReleaseYear(): number {
    return this.releaseYear;
  }

  public getDurationMinutes(): number {
    return this.durationMinutes;
  }

  public getRating(): number {
    return this.rating;
  }

  public getLanguage(): string {
    return this.language;
  }

  public getCountry(): string {
    return this.country;
  }

  public getSynopsis(): string {
    return this.synopsis;
  }

  public getPosterURL(): string {
    return this.posterURL;
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

  public setId(id: string): void {
    this.id = id;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public setGenres(genres: MovieGenre[]): void {
    this.genres = genres;
  }

  public setDirector(director: string): void {
    this.director = director;
  }

  public setCast(cast: string[]): void {
    this.cast = cast;
  }

  public setReleaseYear(releaseYear: number): void {
    this.releaseYear = releaseYear;
  }

  public setDurationMinutes(durationMinutes: number): void {
    this.durationMinutes = durationMinutes;
  }

  public setRating(rating: number): void {
    this.rating = rating;
  }

  public setLanguage(language: string): void {
    this.language = language;
  }

  public setCountry(country: string): void {
    this.country = country;
  }

  public setSynopsis(synopsis: string): void {
    this.synopsis = synopsis;
  }

  public setPosterURL(posterURL: string): void {
    this.posterURL = posterURL;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }

  public setDeletedAt(deletedAt: Date): void {
    this.deletedAt = deletedAt;
  }

  public toJSON(): IMovie {
    return {
      id: this.getId(),
      title: this.getTitle(),
      genres: this.getGenres(),
      director: this.getDirector(),
      cast: this.getCast(),
      releaseYear: this.getReleaseYear(),
      durationMinutes: this.getDurationMinutes(),
      rating: this.getRating(),
      language: this.getLanguage(),
      country: this.getCountry(),
      synopsis: this.getSynopsis(),
      posterURL: this.getPosterURL(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      deletedAt: this.getDeletedAt(),
    };
  }
}
