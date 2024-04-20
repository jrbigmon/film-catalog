import { Module, Provider } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { CacheManagerService } from './cache-manager.service';
import { cacheManagerConfig } from './cache-manager.config';
import { CacheInterceptorCustom } from './cache-manager.interceptor';

const services: Provider[] = [
  CacheInterceptorCustom,
  CacheManagerService,
  {
    provide: 'CacheManagerService',
    useExisting: CacheManagerService,
  },
];

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ...cacheManagerConfig,
    }),
  ],
  providers: services,
  exports: services,
})
export class CacheManagerModule {}
