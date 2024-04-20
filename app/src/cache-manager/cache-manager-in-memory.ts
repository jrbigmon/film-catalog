import { ICacheManagerService } from './cache-manager.interface';

export class CacheManagerInMemory implements ICacheManagerService {
  private caches = new Map<string, any>();

  async set<T>(key: string, value: T): Promise<void> {
    this.caches.set(key, value);
  }

  async get<T>(key: string): Promise<T | undefined> {
    return this.caches.get(key);
  }

  async clear(): Promise<void> {
    return this.caches.clear();
  }
}
