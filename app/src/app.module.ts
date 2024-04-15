import { Module } from '@nestjs/common';
import { MovieGenreModule } from './movie-genre/movie-genre.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryTypeOrm } from './user/repository/user.repository.type.orm';
import { MovieGenreRepositoryTypeOrm } from './movie-genre/repository/movie-genre.repository.type.orm';

@Module({
  imports: [
    AuthModule,
    MovieGenreModule,
    MovieModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: process.env.DB_DIALECT as any,
      host: process.env.BD_HOST,
      port: Number(process.env.BD_PORT),
      username: process.env.BD_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [UserRepositoryTypeOrm, MovieGenreRepositoryTypeOrm],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
