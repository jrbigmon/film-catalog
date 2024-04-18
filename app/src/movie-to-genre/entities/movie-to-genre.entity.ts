export class MovieToGenre {
  private movieId: string;
  private genreId: string;

  constructor(movieId: string, genreId: string) {
    this.movieId = movieId;
    this.genreId = genreId;
  }

  public getMovieId(): string {
    return this.movieId;
  }

  public getGenreId(): string {
    return this.genreId;
  }

  public setMovieId(movieId: string): void {
    this.movieId = movieId;
  }

  public setGenreId(genreId: string): void {
    this.genreId = genreId;
  }

  public toJSON() {
    return {
      movieId: this.movieId,
      genreId: this.genreId,
    };
  }
}
