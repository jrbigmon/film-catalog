import { Module } from '@nestjs/common';
import { MovieGenreModule } from './movie-genre/movie-genre.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryTypeOrm } from './user/repository/user.repository.type.orm';
import { MovieGenreRepositoryTypeOrm } from './movie-genre/repository/movie-genre.repository.type.orm';
import { MovieToGenreModule } from './movie-to-genre/movie-to-genre.module';
import { MovieToGenreRepositoryTypeOrm } from './movie-to-genre/repository/movie-to-genre.repository.type.orm';
import { MovieRepositoryTypeOrm } from './movie/repository/movie.repository.type.orm';
import { DataSource } from 'typeorm';

const entities = [
  UserRepositoryTypeOrm,
  MovieGenreRepositoryTypeOrm,
  MovieToGenreRepositoryTypeOrm,
  MovieRepositoryTypeOrm,
];

@Module({
  imports: [
    AuthModule,
    MovieGenreModule,
    MovieModule,
    UserModule,
    MovieToGenreModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // TypeOrmModule.forRoot({
    //   type: process.env.DB_DIALECT as any,
    //   host: process.env.BD_HOST,
    //   port: Number(process.env.BD_PORT),
    //   username: process.env.BD_USER,
    //   password: process.env.DB_PASS,
    //   database: process.env.DB_NAME,
    //   entities,
    // }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.DB_DIALECT as any,
        host: process.env.BD_HOST,
        port: Number(process.env.BD_PORT),
        username: process.env.BD_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities,
      }),

      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
