import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ExceptionsControllers } from '../utils/exceptions/expcetions-controllers';
import { Response } from 'express';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMovieDto: CreateMovieDto, @Res() res: Response) {
    try {
      const result = await this.movieService.create(createMovieDto);
      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Res() res: Response) {
    try {
      const result = await this.movieService.findAll();
      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      return await this.movieService.findOne(id);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.movieService.update(id, updateMovieDto);
      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.movieService.remove(+id);
      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }
}
