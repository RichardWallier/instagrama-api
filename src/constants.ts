import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { env } from 'process';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async () => {
    const store = await redisStore({
      socket: {
        host: env.REDIS_HOST,
        port: parseInt(env.REDIS_PORT ?? ''),
      },
    });
    return {
      store: () => store,
      isGlobal: true,
    };
  },
  inject: [ConfigService],
};
