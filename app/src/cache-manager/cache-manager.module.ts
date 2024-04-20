import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { CacheManagerService } from './cache-manager.service';
import { cacheManagerConfig } from './cache-manager.config';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      ...cacheManagerConfig,
    }),
  ],
  providers: [CacheManagerService],
  exports: [CacheManagerService],
})
export class CacheManagerModule {}
