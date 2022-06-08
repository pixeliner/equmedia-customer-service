import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ClaimEntity,
  CustomerEntity,
  SubscriptionEntity,
} from 'src/db/entities';
import {
  ClaimRepository,
  CustomerRepository,
  SubscriptionRepository,
} from 'src/db/repositories';
import { CommandHandlers } from './commands/handlers';
import { CustomerController } from './controllers/customer.controller';
import { SubscriptionController } from './controllers/subscription.controller';
import { QueryHandlers } from './queries/handlers';
import { CustomerService, SubscriptionService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerRepository,
      ClaimRepository,
      SubscriptionRepository,
    ]),
    CqrsModule,
  ],
  controllers: [CustomerController, SubscriptionController],
  providers: [
    CustomerService,
    SubscriptionService,
    ConfigService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class CustomerModule {}
