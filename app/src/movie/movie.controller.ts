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
  UseGuards,
  Logger,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ExceptionsControllers } from '../utils/exceptions/exceptions-controllers';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { DataSource } from 'typeorm';
import { queryParser } from '../utils/functions/query-parser';
import { OPTIONS_FILTERS } from './utils/constants/options-filters';
import { CacheInterceptorCustom } from '../cache-manager/cache-manager.interceptor';
import { setResponse } from '../utils/functions/set-reponse';

@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly dataSource: DataSource,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(CacheInterceptorCustom)
  async create(@Body() createMovieDto: CreateMovieDto, @Res() res: Response) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const result = await this.movieService.create(
        createMovieDto,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return res.json(result);
    } catch (error) {
      await queryRunner
        .rollbackTransaction()
        .then(() => Logger.log('Transaction rolled back successfully'))
        .catch((err) => Logger.error(err));
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptorCustom)
  async findAll(
    @Res() res: Response,
    @Query() query: { [key: string]: string },
  ) {
    try {
      const result = await this.movieService.findAll(
        queryParser(query, OPTIONS_FILTERS),
      );

      return setResponse(result, res);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptorCustom)
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.movieService.findOne(id);

      return setResponse(result, res);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptorCustom)
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @Res() res: Response,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      const result = await this.movieService.update(
        id,
        updateMovieDto,
        queryRunner,
      );

      await queryRunner.commitTransaction();

      return res.json(result);
    } catch (error) {
      await queryRunner
        .rollbackTransaction()
        .then(() => Logger.log('Transaction rolled back successfully'))
        .catch((err) => Logger.error(err));
      return ExceptionsControllers.getException(error, res);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseInterceptors(CacheInterceptorCustom)
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.movieService.remove(id);
      return res.json(result);
    } catch (error) {
      return ExceptionsControllers.getException(error, res);
    }
  }
}
