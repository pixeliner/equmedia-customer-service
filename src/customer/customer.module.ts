import { Module } from '@nestjs/common';
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
import { QueryHandlers } from './queries/handlers';
import { CustomerService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerRepository,
      ClaimRepository,
      SubscriptionRepository,
      CustomerEntity,
      ClaimEntity,
      SubscriptionEntity,
    ]),
    CqrsModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, ...CommandHandlers, ...QueryHandlers],
})
export class CustomerModule {}
