import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { ICacheManagerService } from './cache-manager.interface';
import { Response } from 'express';

@Injectable()
export class CacheInterceptorCustom implements NestInterceptor {
  constructor(
    @Inject('CacheManagerService')
    private readonly cacheManagerService: ICacheManagerService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const response = context.switchToHttp().getResponse() as Response;
    const req = context.switchToHttp().getRequest() as Request;
    const method = req.method;
    const url = req.url;

    if (method === 'GET') {
      if (url) {
        const valueInCache = await this.cacheManagerService.get(url);
        if (valueInCache) {
          return response.status(HttpStatus.OK).json(valueInCache);
        }
      }

      return next.handle().pipe(
        tap(async () => {
          const body = response.locals.data;
          await this.cacheManagerService.set(url, body);
        }),
      );
    }

    await this.cacheManagerService.clear();

    return next.handle();
  }
}
