import { Injectable } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  checkCustomerTypeorm() {
    return this.healthCheckService.check([
      () => this.typeOrmHealthIndicator.pingCheck('customer', { timeout: 1000 }),
    ]);
  }
}
