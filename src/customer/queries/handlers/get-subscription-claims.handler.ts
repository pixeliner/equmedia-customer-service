import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ClaimEntity } from 'src/db/entities';
import { SubscriptionRepository } from 'src/db/repositories';
import { GetSubscriptionClaimsQuery } from '../impl';

@QueryHandler(GetSubscriptionClaimsQuery)
export class GetSubscriptionClaimsHandler
  implements IQueryHandler<GetSubscriptionClaimsQuery>
{
  constructor(
    @InjectRepository(SubscriptionRepository)
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async execute(query: GetSubscriptionClaimsQuery): Promise<ClaimEntity[]> {
    const { id } = query;

    const subscription = await this.subscriptionRepository.findOne(id);

    if (!subscription) {
      throw new RpcException({
        statusCode: 404,
        errorStatus: `Subscription with ID: ${id} not found`,
      });
    }

    return subscription.claims;
  }
}
