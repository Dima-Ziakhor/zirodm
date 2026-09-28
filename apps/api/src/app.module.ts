import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { DatabaseModule } from '@nest/database';
import { UserModule } from './user/user.module.js';
import { APP_FILTER } from '@nestjs/core';
import { ApiExceptionFilter } from './common/filters/api-exception.filter.js';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/env.validation.js';
import appConfig from './config/app.config.js';
import databaseConfig from './config/database.config.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // ObserveModule.forRoot({
    //   appKey: 'YOUR_APP_KEY',
    //   appSecret: 'YOUR_APP_SECRET',
    //   serviceId: 'link-sentinel-backend',
    // }),
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env'],
      load: [appConfig, databaseConfig],
      validate,
    }),
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
  ],
})
export class AppModule {}
