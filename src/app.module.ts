import { Module } from '@nestjs/common';
import { MovieGenreModule } from './movie-genre/movie-genre.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    AuthModule,
    MovieGenreModule,
    MovieModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.BD_HOST || 'localhost',
      port: Number(process.env.BD_PORT) || 3306,
      username: process.env.BD_USER || 'root',
      password: process.env.DB_PASS || 'root',
      database: process.env.DB_NAME || 'test',
      entities: [],
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
