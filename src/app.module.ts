import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ScheduleModule } from '@nestjs/schedule';

import { DbModule } from './db/db.module';
import { UtilsModule } from './utils/utils.module';
import { HealthModule } from './health/health.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TerminusModule,
    ScheduleModule.forRoot(),
    DbModule,
    UtilsModule,
    HealthModule,
    CustomerModule
  ],
})
export class AppModule {}
