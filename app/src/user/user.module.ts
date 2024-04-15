import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieGenreRepositoryTypeOrm } from 'src/movie-genre/repository/movie-genre.repository.type.orm';
import { MovieToGenreTypeOrm } from 'src/movie-to-genre/repository/movie-to-genre.repository.type.orm';
import { MovieRepositoryTypeOrm } from 'src/movie/repository/movie.repository.type.orm';
import { UserRepositoryTypeOrm } from './repository/user.repository.type.orm';

const entities = [
  UserRepositoryTypeOrm,
  MovieGenreRepositoryTypeOrm,
  MovieToGenreTypeOrm,
  MovieRepositoryTypeOrm,
];

const models = TypeOrmModule.forFeature(entities);

@Module({
  imports: [models],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: 'UserRepository',
      useExisting: UserRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
