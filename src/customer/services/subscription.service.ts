import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ClaimEntity, SubscriptionEntity } from 'src/db/entities';
import { GetSubscriptionClaimsQuery, GetSubscriptionsQuery } from '../queries/impl';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getAll(): Promise<SubscriptionEntity[]> {
    return this.queryBus.execute(new GetSubscriptionsQuery());
  }

  async getClaims(id: string): Promise<ClaimEntity[]> {
    return this.commandBus.execute(new GetSubscriptionClaimsQuery(id));
  }
}
