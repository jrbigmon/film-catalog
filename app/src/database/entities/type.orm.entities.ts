import { MovieGenreRepositoryTypeOrm } from '../../movie-genre/repository/movie-genre.repository.type.orm';
import { MovieToGenreRepositoryTypeOrm } from '../../movie-to-genre/repository/movie-to-genre.repository.type.orm';
import { MovieRepositoryTypeOrm } from '../../movie/repository/movie.repository.type.orm';
import { UserRepositoryTypeOrm } from '../../user/repository/user.repository.type.orm';

const entities = [
  UserRepositoryTypeOrm,
  MovieGenreRepositoryTypeOrm,
  MovieToGenreRepositoryTypeOrm,
  MovieRepositoryTypeOrm,
];

export default entities;
