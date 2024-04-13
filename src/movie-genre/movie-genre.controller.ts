import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { MovieGenreService } from './movie-genre.service';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { Response } from 'express';
import { ExceptionsControllers } from '../utils/exceptions/expcetions-controllers';

@Controller('movie-genre')
export class MovieGenreController {
  constructor(private readonly movieGenreService: MovieGenreService) {}

  @Post()
  create(
    @Body() createMovieGenreDto: CreateMovieGenreDto,
    @Res() res: Response,
  ) {
    try {
      return this.movieGenreService.create(createMovieGenreDto);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Get()
  findAll(@Res() res: Response) {
    try {
      return this.movieGenreService.findAll();
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      return this.movieGenreService.findOne(id);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovieGenreDto: UpdateMovieGenreDto,
    @Res() res: Response,
  ) {
    try {
      return this.movieGenreService.update(id, updateMovieGenreDto);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    try {
      return this.movieGenreService.remove(id);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }
}
