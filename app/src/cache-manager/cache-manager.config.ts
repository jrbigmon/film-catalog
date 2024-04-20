import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

export const cacheManagerConfig = {
  store: redisStore,
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
} as RedisClientOptions;
