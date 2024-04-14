import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MovieGenreService } from './movie-genre.service';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { Response } from 'express';
import { ExceptionsControllers } from '../utils/exceptions/exceptions-controllers';
import { AuthGuard } from '@nestjs/passport';

@Controller('movie-genre')
export class MovieGenreController {
  constructor(private readonly movieGenreService: MovieGenreService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMovieGenreDto: CreateMovieGenreDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.movieGenreService.create(createMovieGenreDto);
      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findAll(@Res() res: Response) {
    try {
      const result = await this.movieGenreService.findAll();
      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.movieGenreService.findOne(id);
      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateMovieGenreDto: UpdateMovieGenreDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.movieGenreService.update(
        id,
        updateMovieGenreDto,
      );
      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.movieGenreService.remove(id);
      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }
}
