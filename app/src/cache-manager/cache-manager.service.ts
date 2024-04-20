import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ICacheManagerService } from './cache-manager.interface';

@Injectable()
export class CacheManagerService implements ICacheManagerService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}

  public static readonly TTL_ONE_DAY = 86400000;

  public async set<T>(key: string, value: T): Promise<void> {
    await this.cacheService.set(key, value, CacheManagerService.TTL_ONE_DAY);
  }

  public async get<T>(key: string): Promise<T | undefined> {
    return await this.cacheService.get(key);
  }

  public async clear(): Promise<void> {
    return await this.cacheService.reset();
  }
}
