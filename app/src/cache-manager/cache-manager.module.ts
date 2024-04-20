import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { CacheManagerService } from './cache-manager.service';
import { cacheManagerConfig } from './cache-manager.config';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ...cacheManagerConfig,
    }),
  ],
  providers: [
    CacheManagerService,
    { provide: 'CacheManagerService', useExisting: CacheManagerService },
  ],
  exports: [CacheManagerService],
})
export class CacheManagerModule {}
